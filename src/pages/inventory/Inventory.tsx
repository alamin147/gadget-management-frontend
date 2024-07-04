import { useEffect, useState } from "react";
import {
  useDeleteSelectedAllMutation,
  useDeleteSingleGadgetMutation,
  useGetMyGadgetsQuery,
} from "../../redux/api/api";
import SingleInventory from "./SingleInventory";
import Reveal from "react-awesome-reveal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Inventory = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let decodedUser: any;
  if (token) {
    decodedUser = verifyToken(token);
    // console.log("decodedToken",decodedUser)
  }
  const {
    data: gadgets,
    refetch,
    isLoading: dataLoad,
  } = useGetMyGadgetsQuery(
    decodedUser?.username ? decodedUser?.username : undefined
  );

  if (!dataLoad && gadgets?.message == "unauthorized access") {
    dispatch(logout());
  }

  useEffect(() => {
    refetch();
  }, []);
  // console.log(gadgets)

  const [deleteSingleGadget, { isLoading }] = useDeleteSingleGadgetMutation();
  const [successToast, setsuccessToast] = useState(false);

  const handleDelete = async (id: string) => {
    //console.log("inventory", id);
    const res = await deleteSingleGadget(id);
    if (res) {
      setsuccessToast(true);
      setTimeout(() => {
        setsuccessToast(false);
      }, 1000);
    }
  };

  const [selectedId, setSelectedId]: any = useState([]);
  const handleClick = (id: string) => {
    // console.log("clicked", id);
    const foundId = selectedId.find((singleId: string) => singleId == id);

    if (!foundId) {
      setSelectedId([...selectedId, id]);
    } else {
      const removedId = selectedId.filter((singleId: string) => singleId != id);
      setSelectedId(removedId);
    }

    //console.log("clicked arr", selectedId);
  };

  const [deleteSelectedAll, { isLoading: isDeleteSelectedLoading }] =
    useDeleteSelectedAllMutation();
  const handleAllDelete = async () => {
    const res = await deleteSelectedAll(selectedId);
    if (res) {
      setsuccessToast(true);
      setTimeout(() => {
        setsuccessToast(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="hero bg-base-200  mb-24 py-5">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold inline">Inventory</h1>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Loading...</span>
          </div>
        </div>
      )}
      {dataLoad && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Loading...</span>
          </div>
        </div>
      )}
      {successToast && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Product Deleted</span>
          </div>
        </div>
      )}
      {isDeleteSelectedLoading && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Deleting..</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        {gadgets?.length > 0 ? (
          <Reveal>
            <table className="table text-center">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity Available</th>
                  <th>Price</th>
                  <th>Details</th>
                  <th>Edit</th>
                  <th>Duplicate</th>
                  <th>Delete</th>
                  <th>Delete Multiples</th>
                </tr>
              </thead>
              <tbody>
                {gadgets.map((gadget: any) => (
                  <SingleInventory
                    handleDelete={handleDelete}
                    isLoading={isLoading}
                    setsuccessToast={setsuccessToast}
                    key={gadget?._id}
                    gadget={gadget}
                    handleClick={handleClick}
                  />
                ))}
              </tbody>
            </table>
          </Reveal>
        ) : gadgets?.message == "unauthorized access" ? (
          <p className="text-red-500 text-center">{gadgets?.message}</p>
        ) : (
          <p className="text-center">No gadgets found</p>
        )}
      </div>

      <div className="flex justify-end me-6 md:me-8 lg:me-10 mt-3">
        <p onClick={handleAllDelete} className="btn">
          Delete Selected
        </p>
      </div>
    </>
  );
};
export default Inventory;
