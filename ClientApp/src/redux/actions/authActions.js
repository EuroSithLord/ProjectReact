export const loginAction = (userName, fullName) => {
    return {
        type: "LOG_IN_USER",
        userName: userName,
        fullName: fullName
    }
}

export const logOutAction = () => {
    return {
        type: "LOG_OUT_USER",
        userName: "",
        fullName: "",
        isLoggedIn: "false"
    }
}