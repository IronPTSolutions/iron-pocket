function LinkItem({url, title, description, image, keywords}) {
    return(
        <div className="card mb-3" >
            <div className="row g-0">
                <div className="col-md-2">
                <img src={image} className="img-fluid rounded-start" alt={title}/>
                </div>
                <div className="col-md-10">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default LinkItem;