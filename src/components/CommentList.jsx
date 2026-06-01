function CommentList({ comments }) {

    if (comments.length === 0) {

        return (
            <div className="alert alert-info">
                No comments yet.
            </div>
        );
    }

    return (

        <div className="mt-3">

            <h4>Comments</h4>

            {comments.map((comment) => (

                <div
                    key={comment.id}
                    className="card mb-2"
                >

                    <div className="card-body">

                        <h6>
                            {comment.user?.username}
                        </h6>

                        <p className="mb-0">
                            {comment.comment}
                        </p>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default CommentList;