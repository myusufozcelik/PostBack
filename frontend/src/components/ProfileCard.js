import React from "react";
import { withRouter } from "react-router-dom";
// import { Authentication } from "../shared/AuthenticationContext";

const ProfileCard = (props) => {
  // class olmadığı için aşağıda oluşturduk
  const pathUsername = props.match.params.username;
  const loggedInUsername = props.username;
  let message = "We cannot edit";
  if (pathUsername === loggedInUsername) {
    message = "We can edit";
  }

  return <div>{pathUsername}</div>;
};

// class ProfileCardContextWrapper extends React.Component {
//   static contextType = Authentication;
//   render() {
//     return (
//       <ProfileCard {...this.props} username={this.context.state.username} />
//     );
//   }
// }

export default withRouter(ProfileCard);
