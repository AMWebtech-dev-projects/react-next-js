import React, { useState, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import Switch from 'react-switch';
import axios from 'axios';
import { url } from '../../../src/API/ApiUrl';
import showToaster from 'components/Toaster/Toaster';
import {
  errorMessage,
  errorr,
  success,
} from 'components/Toaster/ToasterMassage';
import { loader } from 'redux/reducer/Loader';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'react-bootstrap';
import UpdateModal from 'components/Modal/UpdateModal';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: boolean;
  recordsTotal: number;
}
const TableServerUI = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchInput, setSearchInput] = useState('');
  const [userListData, setUserListData] = useState<User[]>([]);
  const [recordsTotal, setRecordsTotal] = useState<any>();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'asc' | 'desc';
  }>({
    key: '_id',
    direction: 'asc',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const tableConfig: any = [
    {
      data: 'sr-number',
      name: '',
      searchable: false,
      orderable: false,
      search: {
        value: searchInput,
        regex: false,
      },
    },
    {
      data: 'firstName',
      name: '',
      searchable: true,
      orderable: true,
      search: {
        value: searchInput,
        regex: false,
      },
    },
    {
      data: 'email',
      name: '',
      searchable: true,
      orderable: true,
      search: {
        value: searchInput,
        regex: false,
      },
    },
    {
      data: 'role',
      name: '',
      searchable: true,
      orderable: true,
      search: {
        value: searchInput,
        regex: false,
      },
    },
  ];

  const token = useSelector(
    (state: RootState) => state?.login?.loginData?.authorization
  );

  useEffect(() => {
    getUser(token, searchInput, itemsPerPage, sortConfig);
  }, [token, searchInput, currentPage, itemsPerPage, sortConfig]);

  const getUser = async (
    token: string,
    searchInput: string,
    itemsPerPage: number,
    sortConfig: { key: keyof User; direction: 'asc' | 'desc' }
  ) => {
    let orderColumn: number = tableConfig.findIndex(
      (ele: any) => ele.data === sortConfig.key
    );
    orderColumn = orderColumn >= 0 ? orderColumn : 1;
    const payload = {
      draw: currentPage + 1,
      columns: tableConfig,
      order: [
        {
          column: orderColumn,
          dir: sortConfig.direction,
        },
      ],
      start: currentPage * itemsPerPage,
      length: itemsPerPage,
      search: {
        value: searchInput ? searchInput : '',
        regex: false,
      },
    };

    await axios
      .post(`${url}getUsersListServer`, payload, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const dataWithSerialNumber = res.data.data.data.map(
          (user: User, index: number) => ({
            ...user,
            serialNumber: index + 1,
          })
        );
        setUserListData(dataWithSerialNumber);
        setRecordsTotal(res.data.data);
      })
      .catch(() => {
        showToaster(errorr, errorMessage);
        dispatch(loader(false));

        console.warn('Something Went Wrong');
      });
  };

  const handleUpdateStatus = async (id: string, newStatus: number) => {
    try {
      const updatedUserList = userListData.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            status: newStatus === 1 ? true : false,
          };
        }
        return user;
      });

      setUserListData(updatedUserList);

      await axios.post(
        `${url}saveUserInfo`,
        {
          status: newStatus,
          _id: id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      showToaster(success, 'User status updated successfully');
    } catch (error) {
      showToaster(errorr, 'Failed to update user status');
      console.error('Something went wrong:', error);
    }
  };

  const handleUpdateUser = async (id: string) => {
    setModalShow(true);
    setSelectedUserId(id);
  };

  const handleOpenDeleteModal = (id: string, username: string) => {
    setSelectedUserId(id);
    setSelectedUserName(username);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async (id: string) => {
    await axios
      .post(
        `${url}deleteUser`,
        {
          _id: id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response: any) => {
        if (response.status === 200) {
          dispatch(loader(false));
          showToaster(success, response?.data?.message);
          const updatedUserList = userListData.filter(
            (user) => user._id !== id
          );
          setUserListData(updatedUserList);
          setShowDeleteModal(false);
        } else {
          dispatch(loader(false));
          showToaster(errorr, response?.message);
        }
      })
      .catch(() => {
        showToaster(errorr, errorMessage);
        dispatch(loader(false));

        console.warn('Something Went Wrong');
      });
  };

  const handleSort = (key: keyof User) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.key === key) {
        return {
          key,
          direction: prevSortConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return {
        key,
        direction: 'asc',
      };
    });
    setCurrentPage(0);
  };
  const startIndex = currentPage * itemsPerPage;
  return (
    <>
      <UpdateModal
        show={modalShow}
        UserID={selectedUserId}
        onClose={() => setModalShow(false)}
      />
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><h3>Delete User</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user{' '}
          <strong>{selectedUserName}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteUser(selectedUserId)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="d-flex">
          <div className="sidebar-heading text-center py-2 dark-text fs-2 fw-bold text-uppercase">
            Datatables with server side pagination
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="offset-md-8">
              <input
                type="text"
                className="form-control"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        <div
          className="table-responsive text-nowrap "
          style={{ minHeight: '400px' }}
        >
          <table
            className="table table-bordered table-striped"
            style={{ marginTop: '10px' }}
          >
            <thead className="table__head">
              <tr className="winner__table">
                <th>SN</th>
                <th
                  scope="col"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('firstName')}
                >
                  User Name{' '}
                  {sortConfig.key === 'firstName' &&
                    sortConfig.direction === 'desc' && (
                      <FontAwesomeIcon icon={faSortUp} />
                    )}
                  {sortConfig.key === 'firstName' &&
                    sortConfig.direction === 'asc' && (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                </th>
                <th
                  scope="col"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('email')}
                >
                  Email ID{' '}
                  {sortConfig.key === 'email' &&
                    sortConfig.direction === 'desc' && (
                      <FontAwesomeIcon icon={faSortUp} />
                    )}
                  {sortConfig.key === 'email' &&
                    sortConfig.direction === 'asc' && (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                </th>
                <th
                  scope="col"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('role')}
                >
                  Account Type{' '}
                  {sortConfig.key === 'role' &&
                    sortConfig.direction === 'desc' && (
                      <FontAwesomeIcon icon={faSortUp} />
                    )}
                  {sortConfig.key === 'role' &&
                    sortConfig.direction === 'asc' && (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                </th>

                <th> Status</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {userListData && userListData.length > 0 ? (
                userListData &&
                userListData.map((item: any, index: number) => (
                  <tr className="winner__table" key={`${(item._id, index)}`}>
                    <td>{startIndex + index + 1}</td>
                    <td>{`${item.firstName} ${item.lastName}`}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <Switch
                        checked={Boolean(item.status)}
                        onChange={(checked) =>
                          handleUpdateStatus(item._id, checked ? 1 : 0)
                        }
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#009EFB"
                        offColor="#dcdcdc"
                        className="status-switch"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleUpdateUser(item._id)}
                        className="btn btn-warning"
                      >
                        <i className="fas fa-edit" style={{color: "white"}} aria-hidden="true"></i>
                      </button>
                      &nbsp;
                      <button
                        onClick={() =>
                          handleOpenDeleteModal(
                            item._id,
                            `${item.firstName} ${item.lastName}`
                          )
                        }
                        className="btn btn-danger"
                      >
                        <i className="fa fa-trash" style={{color: "white"}} aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    style={{
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      fontSize: 'larger',
                    }}
                  >
                    <h4 className="pb-5" style={{ marginTop: '150px' }}>
                      No record found!
                    </h4>
                    <br></br>
                    <br></br>
                    <br></br>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="pagination-container d-flex justify-content-end">
              {recordsTotal?.recordsTotal ? (
                <ReactPaginate
                  pageCount={Math.ceil(
                    recordsTotal?.recordsTotal / itemsPerPage
                  )}
                  onPageChange={(selectedItem) =>
                    setCurrentPage(selectedItem.selected)
                  }
                  initialPage={currentPage}
                  previousLabel="Previous"
                  nextLabel="Next"
                  forcePage={currentPage}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  marginPagesDisplayed={3}
                  pageRangeDisplayed={5}
                  containerClassName="pagination"
                  activeClassName="active"
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableServerUI;
