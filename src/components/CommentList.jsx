function CommentList({ comments }) {

    return (

        <>
            {comments.map(comment => (

                <div
                    key={comment.id}
                    className="border p-2 mb-2"
                >

                    <strong>
                        {comment.username}
                    </strong>

                    <p>
                        {comment.comment}
                    </p>

                </div>

            ))}
        </>

    );
}

export default CommentList;