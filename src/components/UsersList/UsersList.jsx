import {useState} from "react";
import {deleteUser} from "../../Service/UserService.js";
import toast from "react-hot-toast";

const UsersList = ({users, setUsers}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );



    const deleteByUserId = async (id) => {
        try {
            await deleteUser(id);
            setUsers(prevUsers => prevUsers.filter(user => user.userId !== id));
            toast.success("User deleted");
        } catch (e) {
            console.error(e);
            toast.error("Unable to delete the user");
        }
    }

    return (
        <div className="category-list-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="row pe-2">
                <div className="input-group mb-3">
                    <input type="text"
                           name="keyword"
                           id="keyword"
                           placeholder="Search by keyword"
                           className="form-control"
                           onChange={(e) => setSearchTerm(e.target.value)}
                           value={searchTerm}
                    />
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div className="row g-3" style={{ alignItems: "flex-start" }}>
                {
                    filteredUsers.map((user, index) => (
                        <div key={index} className="col-12 mb-2" style={{ height: "auto" }}>
                            <div
                                className="card py-2 px-3 bg-dark text-white"
                                style={{ height: "auto", minHeight: "unset" }}
                            >
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h6 className="mb-0">{user.name}</h6>
                                        <p className="text-white">{user.email}</p>
                                    </div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteByUserId(user.userId)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default UsersList;



























