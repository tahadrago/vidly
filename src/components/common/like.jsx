// import React, { Component } from "react";
import React from "react";


const Like = ({liked,onClick}) => {
  const likeClass = liked ? "fa-solid fa-heart text-red-600" : "fa-regular fa-heart";

  return (
    <button onClick={onClick} className="mr-2">
      <i className={likeClass}></i>
    </button>
  );
};

export default Like;

// class Like extends Component {
//   state = {
//     liked: false,
//   };
//   handleClick = () => {
//     this.setState((prevState) => ({ liked: !prevState.liked }));
//   };
//   render() {
//     return (
//       <button onClick={() => this.props.onClick()} className="mr-2">
//         <i className={this.like()}></i>
//       </button>
//     );
//   }
//     like() {
//         return this.props.liked ? "fa-solid fa-heart text-red-600" : "fa-regular fa-heart ";
//     }
// }


