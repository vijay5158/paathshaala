import React from 'react';
import { connect } from "react-redux";
import './style.css';

function Announcement(props) {



    return (
        <>
            <p>props.announcement</p>
        </>

    );

}

// const mapStateToProps = state => {
//     return {
//         authenticated: state.authReducer.token !== null,
//         token: state.authReducer.token,
//         is_student: state.authReducer.is_student,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         // logout: () => dispatch(logout()),
//         // handleLogout: ()=> dispatch(handleLogout())
//     };
// };

// export default withRouter(
//     connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )(Announcement))

export default Announcement;
