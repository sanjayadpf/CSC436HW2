export default function ClearCompletedTodo({ dispatch }) {
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