import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  comments: [],
};

// Actions
const SET_COMMENTS = 'SET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';

// Reducer function
const commentReducer = (state, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments: action.payload };
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    default:
      return state;
  }
};

// Context
const CommentContext = createContext();

// Provider component
export const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  // Actions
  const setComments = (comments) => {
    dispatch({ type: SET_COMMENTS, payload: comments });
  };

  const addComment = (comment) => {
    dispatch({ type: ADD_COMMENT, payload: comment });
    // Normally, you would also make an API call to persist the comment
    // and handle any potential errors or side effects.
  };

  return (
    <CommentContext.Provider value={{ state, setComments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};

// Custom hook for using comment context
export const useCommentContext = () => useContext(CommentContext);
