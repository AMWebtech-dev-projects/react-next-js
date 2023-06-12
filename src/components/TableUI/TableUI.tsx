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

interface TableProps {
  data: [];
  itemsPerPage: number;
}
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: boolean;
}

const TableUI: React.FC<TableProps> = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchInput, setSearchInput] = useState('');
  const [userListData, setUserListData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'ascending' | 'descending';
  }>({
    key: '_id',
    direction: 'ascending',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');

  const token = useSelector(
    (state: RootState) => state?.login?.loginData?.authorization
  );

  useEffect(() => {
    getUser(token);
  }, [token]);

  const getUser = async (token: string) => {
    await axios
      .get(`${url}getUsersList`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const dataWithSerialNumber = res.data.data.map(
          (user: User, index: number) => ({
            ...user,
            serialNumber: index + 1,
          })
        );
        setUserListData(dataWithSerialNumber);
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
          direction:
            prevSortConfig.direction === 'ascending'
              ? 'descending'
              : 'ascending',
        };
      }
      return {
        key,
        direction: 'ascending',
      };
    });
  };

  useEffect(() => {
    filterData();
  }, [searchInput, userListData, sortConfig]);

  const filterData = () => {
    const sortedCopy = [...sortedData];
    const filtered = sortedCopy.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.role.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const sortedData = useMemo(() => {
    const dataCopy = [...userListData];
    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];
        if (valueA < valueB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  }, [userListData, sortConfig]);

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Delete User</h3>
          </Modal.Title>
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
            Datatables UI side
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <div className="d-flex align-items-center">
              <label htmlFor="show-entries-select" className="me-2 d-inline">
                Show Entries
              </label>
              <select
                id="show-entries-select"
                className="form-select"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="col-md-10">
            <div className="offset-md-8">
              <input
                type="text"
                className="form-control"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by User Name"
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
                <th
                  scope="col"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('_id')}
                >
                  SN{' '}
                  {sortConfig.key === '_id' &&
                    sortConfig.direction === 'ascending' && (
                      <FontAwesomeIcon icon={faSortUp} />
                    )}
                  {sortConfig.key === '_id' &&
                    sortConfig.direction === 'descending' && (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                </th>
                <th
                  scope="col"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('firstName')}
                >
                  User Name{' '}
                  {sortConfig.key === 'firstName' &&
                    sortConfig.direction === 'ascending' && (
                      <FontAwesomeIcon icon={faSortUp} />
                    )}
                  {sortConfig.key === 'firstName' &&
                    sortConfig.direction === 'descending' && (
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
                    sortConfig.direction === 'ascending' && (
                      <FontAwesomeIcon icon={faSortUp} />
                    )}
                  {sortConfig.key === 'email' &&
                    sortConfig.direction === 'descending' && (
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
                    sortConfig.direction === 'ascending' && (
                      <FontAwesomeIcon icon={faSortUp} />
                    )}
                  {sortConfig.key === 'role' &&
                    sortConfig.direction === 'descending' && (
                      <FontAwesomeIcon icon={faSortDown} />
                    )}
                </th>

                <th> Status</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {currentPageData && currentPageData.length > 0 ? (
                currentPageData &&
                currentPageData.map((item: any, index: number) => (
                  <tr className="winner__table" key={`${item._id}`}>
                    <td>{item.serialNumber}</td>
                    <td>{`${item.firstName} ${item.lastName}`}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <Switch
                        checked={item.status}
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
                        onClick={() =>
                          handleOpenDeleteModal(
                            item._id,
                            `${item.firstName} ${item.lastName}`
                          )
                        }
                        className="btn btn-danger"
                      >
                        <i
                          className="fa fa-trash"
                          style={{ color: 'white' }}
                          aria-hidden="true"
                        ></i>
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
              <ReactPaginate
                pageCount={Math.ceil(filteredData.length / itemsPerPage)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableUI;
