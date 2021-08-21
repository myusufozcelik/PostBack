import axios from "axios";
import React, { Component } from "react";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function withApiProgress(WrappedComponent, apiPath) {
  return class ApiProgress extends Component {
    static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

    state = {
      pendingApiCall: false,
    };

    componentDidMount() {
      axios.interceptors.request.use((request) => {
        this.updateApiCallFor(request.url, true);
        return request;
      });

      axios.interceptors.response.use(
        (response) => {
          this.updateApiCallFor(response.config.url, false);

          return response;
        },
        (error) => {
          this.updateApiCallFor(error.config.url, false);

          throw error;
        }
      );
    }

    updateApiCallFor = (url, inProgress) => {
      if (url === apiPath) {
        this.setState({
          pendingApiCall: inProgress,
        });
      }
    };

    // bu şekilde pendingApiCall, LoginPage classında state yerine propstan gelecek
    render() {
      const { pendingApiCall } = this.state;
      return (
        <WrappedComponent pendingApiCall={pendingApiCall} {...this.props} />
      );
    }
  };
}
