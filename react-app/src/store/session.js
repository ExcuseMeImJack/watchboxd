// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_ONE_USER = "users/GET_USER"
const GET_ALL_USERS = "users/GET_USERS"
const DELETE_USER = "users/DELETE_USER"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const actionGetAllUsers = (users) => ({
    type: GET_ALL_USERS,
    users
})

export const actionGetOneUser = (user) => ({
    type: GET_ONE_USER,
    user
})

export const actionDeleteUser = (user) => ({
    type: DELETE_USER,
    user
})



export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const thunkGetAllUsers = () => async(dispatch) => {
    const res = await fetch('/api/users');
    if(res.ok) {
        const users = await res.json();
        dispatch(actionGetAllUsers(users));
        return users;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkGetUserById = (userId) => async(dispatch) => {
    const res = await fetch(`/api/users/${userId}`);
    if(res.ok){
        const user = await res.json();
        dispatch(actionGetOneUser(user));
        return user;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkDeleteUser = (user) => async(dispatch) => {
    const res = await fetch('/api/users', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    if(res.ok) {
        const data = await res.json();
        if(!data.errors) {
            return {"message": "Successfully Deleted"}
        }
		dispatch(logout());
    } else {
        const errors = await res.json();
        return errors;
    }
}

const initialState = { user: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case GET_ALL_USERS:
			return { user: action.users}
		case GET_ONE_USER:
			return { user: action.user }
		default:
			return state;
	}
}
