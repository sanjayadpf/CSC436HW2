import { StateContext } from '../contexts';
import { useContext } from "react";

export default function ClearCompletedTodo() {
    const { dispatch } = useContext(StateContext);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: "CLEAR_COMPLETED_TODO" });
            }}
        >
            <input type="submit" value="Clear Completed" />
        </form>
    );
}