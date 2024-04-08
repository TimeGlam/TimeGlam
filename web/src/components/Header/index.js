function Header() {
    return (
        <header className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-items-center">
                <div className="text-align-right mr-3">
                    <span className="d-block m-0 p-0 text-white">TimeGlam</span>
                    <small className="m-0 p-0 text-white">Gold</small>
                </div>
                <div className="ml-auto">
                    <img src="https://i.pinimg.com/originals/7a/9c/c3/7a9cc36f478969da92e2e9fee391a5b2.jpg" />
                    <span className="mdi mdi-chevron-down"></span>
                </div>
            </div>
        </header>
    );
}

export default Header;
