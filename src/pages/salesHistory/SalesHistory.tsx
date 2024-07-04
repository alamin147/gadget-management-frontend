import { DefinedRange } from "react-date-range";
import { useGetSellProductQuery } from "../../redux/api/api";
import { useEffect, useState } from "react";

const SalesHistory = () => {
  const { data: sells, isLoading } = useGetSellProductQuery(undefined);
  const [endDate, setendDate] = useState();
  useEffect(() => {
    setfilteredGadget(sells);
  }, [sells]);
  const [filteredGadget, setfilteredGadget]: any = useState();
  // console.log(filteredGadget)
  const handleSelect = (date: any) => {
    let filtered = sells.filter((singleSell: any) => {
      let productDate = new Date(singleSell.sellingDate);
      return (
        productDate >= date.selection.startDate &&
        productDate <= date.selection.endDate
      );
    });
    // console.log(date);
    setendDate(date.selection.endDate);
    setfilteredGadget(filtered);
  };
  const selectionRange = {
    startDate: new Date(),
    endDate: endDate,
    key: "selection",
  };

  return (
    <>
      <div className="hero bg-base-200 mb-20 py-5">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold inline">Sales History</h1>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Loading..</span>
          </div>
        </div>
      )}
      <div className="flex flex-col ms-5 mb-5 mt-0">
       <p className="ms-5"> Filter by Dates</p>
        <DefinedRange
          className=""
          onChange={handleSelect}
          ranges={[selectionRange]}
        />
      </div>
      <div className="overflow-x-auto mb-10">
        <table className="table text-center">
          <thead>
            <tr>
              <th>Buyer Name</th>
              <th>Contact no</th>
              <th>Total</th>
              <th>Selling Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredGadget?.map((sell: any) => {
              return (
                <tr key={sell?._id}>
                  <td>{sell?.buyerName}</td>
                  <td>{sell?.contactNo}</td>
                  <td>${sell?.total}</td>
                  <td>{sell?.sellingDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default SalesHistory;
