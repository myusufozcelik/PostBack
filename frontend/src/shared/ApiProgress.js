import axios from "axios";
import React, { Component } from "react";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export const withApiProgress = (WrappedComponent, apiPath) => {
  return class extends Component {
    static displayName = `ApiProgress${getDisplayName(WrappedComponent)}`;

    state = {
      pendingApiCall: false,
    };

    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.updateApiCallFor(req.url, true);
        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        (res) => {
          this.updateApiCallFor(res.config.url, false);
          return res;
        },
        (error) => {
          this.updateApiCallFor(error.config.url, false);
          throw error;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    updateApiCallFor = (url, inProgress) => {
      if (url === apiPath) {
        this.setState({
          pendingApiCall: true,
        });
      }
    };

    render(props) {
      const { pendingApiCall } = this.state;
      // return (
      //   <div>
      //     {React.cloneElement(this.props.children, {
      //       pendingApiCall: pendingApiCall,
      //     })}
      //   </div>
      // );
      return (
        <WrappedComponent pendingApiCall={pendingApiCall} {...this.props} />
      );
    }
  };
};
