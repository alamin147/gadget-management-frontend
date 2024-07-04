import { useEffect, useState } from "react";
import { useGetGadgetsQuery } from "../../redux/api/api";
import Product from "./Product";
import ReactSlider from "react-slider";
import "./Product.css";
import { Fade } from "react-awesome-reveal";

const Products = () => {
  const [finalselectedFilters, setfinalSelectedFilters]: any = useState();
  const { data: gadgets, isLoading } = useGetGadgetsQuery(finalselectedFilters);

  //dynamic filter button
  const [filterOpen, setFilterOpen] = useState(false);

  // search
  const [search, setSearch] = useState("");
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  useEffect(() => {
    setSearchFilteredData(gadgets);
  }, [gadgets]);

  //category
  const templateCategory = ["phone", "laptop", "camera", "smart watch"];
  const [selectedCategoryFilters, setselectedCategoryFilters]: any = useState();

  // operating system
  const templateoperatingSystem = ["iOS", "android", "windows", "linux"];
  const [
    selectedOperatingSystemFilters,
    setselectedOperatingSystemFilters,
  ]: any = useState();
  // release year
  const templateReleaseYear = ["2024", "2023", "2022", "2021"];
  const [selectedReleaseYearFilters, setselectedReleaseYearFilters]: any =
    useState();
  // connectivity
  const templateConnectivity = ["bluetooth", "wifi", "usb-c"];
  const [selectedConnectivityFilters, setselectedConnectivityFilters]: any =
    useState();
  // power source
  const templatePowerSource = ["wired", "wireless"];
  const [selectedPowerSourceFilters, setselectedPowerSourceFilters]: any =
    useState();
  // features
  const templateFeatures = [
    "waterproof",
    "fast charging",
    "128 GB storage",
    "8 GB ram",
    "led keyboard",
    "burst shot",
  ];
  const [selectedFeaturesFilters, setselectedFeaturesFilters]: any = useState();

  //price
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const handlePrice = (price: any) => {
    setMinPrice(price[0]);
    setMaxPrice(price[1]);
    // console.log(minPrice, maxPrice);
  };

  //submit final data
  const handleFinalFilter = () => {
    const data = {
      category: selectedCategoryFilters,
      operating_system: selectedOperatingSystemFilters,
      release_year: selectedReleaseYearFilters,
      connectivity: selectedConnectivityFilters,
      power_source: selectedPowerSourceFilters,
      features: selectedFeaturesFilters,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    setfinalSelectedFilters(data);
    // console.log(data);
  };
  const handleResetSelectedFilters = () => {
    setselectedCategoryFilters("");
    setselectedOperatingSystemFilters("");
    setselectedReleaseYearFilters("");
    setselectedConnectivityFilters("");
    setselectedPowerSourceFilters("");
    setselectedFeaturesFilters("");
    setMinPrice(0);
    setMaxPrice(50000);
  };
  return (
    <>
      <div className="flex justify-center mb-5 py-5">
        <div className=" text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold inline">Gadgets</h1>
          </div>
        </div>
      </div>
      {/* search div */}
      <div className="hero mb-5">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="bg-transparent"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="flex justify-center w-full mb-5">
        <button
          className="btn btn-primary"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Filters here
        </button>
      </div>
      {filterOpen && (
        <div>
          {/* price slider */}
          <p>Price:</p>
          <div className="flex justify-center mb-16 w-3/4 mx-auto">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[minPrice, maxPrice]}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              max={50000}
              min={0}
              step={1000}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
              pearling
              minDistance={10000}
              onChange={(state) => handlePrice(state)}
            />
          </div>

          {/* all filters div */}

          <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-3 lg:max-w-4xl md:max-w-3xl max-w-sm">
            {/* features filter */}
            <div className="hero mb-5">
              <div className="">
                <h1 className="mb-1">Filter by Features:</h1>
                {templateFeatures?.map((buttonData: any, idx: any) => (
                  <button
                    onClick={() => setselectedFeaturesFilters(buttonData)}
                    className={`button ${
                      selectedFeaturesFilters?.includes(buttonData)
                        ? "actives"
                        : ""
                    }`}
                    key={`filterFeatures-${idx}222237`}
                  >
                    {buttonData}
                  </button>
                ))}
              </div>
            </div>

            {/* category filter */}
            <div className="hero mb-5">
              <div className="">
                <h1 className="mb-1">Filter by Category:</h1>
                {templateCategory?.map((buttonData: any, idx: any) => (
                  <button
                    onClick={() => setselectedCategoryFilters(buttonData)}
                    className={`button ${
                      selectedCategoryFilters?.includes(buttonData)
                        ? "actives"
                        : ""
                    }`}
                    key={`filtersCateg-${idx}`}
                  >
                    {buttonData}
                  </button>
                ))}
              </div>
            </div>

            {/* operating system filter */}
            <div className="hero mb-5">
              <div className="">
                <h1 className="mb-1">Filter by Operating system:</h1>
                {templateoperatingSystem?.map((buttonData: any, idx: any) => (
                  <button
                    onClick={() =>
                      setselectedOperatingSystemFilters(buttonData)
                    }
                    className={`button ${
                      selectedOperatingSystemFilters?.includes(buttonData)
                        ? "actives"
                        : ""
                    }`}
                    key={`filters-${idx}2374125`}
                  >
                    {buttonData}
                  </button>
                ))}
              </div>
            </div>

            {/* release year filter */}
            <div className="hero mb-5">
              <div className="">
                <h1 className="mb-1">Filter by release year:</h1>
                {templateReleaseYear?.map((buttonData: any, idx: any) => (
                  <button
                    onClick={() => setselectedReleaseYearFilters(buttonData)}
                    className={`button ${
                      selectedReleaseYearFilters?.includes(buttonData)
                        ? "actives"
                        : ""
                    }`}
                    key={`filters-${idx}111237`}
                  >
                    {buttonData}
                  </button>
                ))}
              </div>
            </div>
            {/* connectivity filter */}
            <div className="hero mb-5">
              <div className="">
                <h1 className="mb-1">Filter by Connectivity:</h1>
                {templateConnectivity?.map((buttonData: any, idx: any) => (
                  <button
                    onClick={() => setselectedConnectivityFilters(buttonData)}
                    className={`button ${
                      selectedConnectivityFilters?.includes(buttonData)
                        ? "actives"
                        : ""
                    }`}
                    key={`filters-${idx}1711237`}
                  >
                    {buttonData}
                  </button>
                ))}
              </div>
            </div>

            {/* power source filter */}
            <div className="hero mb-5">
              <div className="">
                <h1 className="mb-1">Filter by Power source:</h1>
                {templatePowerSource?.map((buttonData: any, idx: any) => (
                  <button
                    onClick={() => setselectedPowerSourceFilters(buttonData)}
                    className={`button ${
                      selectedPowerSourceFilters?.includes(buttonData)
                        ? "actives"
                        : ""
                    }`}
                    key={`filters-${idx}9222237`}
                  >
                    {buttonData}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* filter button */}
          <div className="flex gap-2 justify-center mb-10">
            <button onClick={handleFinalFilter} className="btn btn-primary">
              Filter
            </button>
            <button
              onClick={handleResetSelectedFilters}
              className="btn btn-ghost border-primary"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Loading..</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-12 ms-5 mb-8">
        <Fade cascade damping={0.1}>
          {searchFilteredData
            ?.filter((item: any) => {
              return search.toLowerCase() === ""
                ? item
                : item.brand.toLowerCase().includes(search) ||
                    item.model_number.toLowerCase().includes(search);
            })
            ?.map((gadget: any) => {
              return <Product key={gadget._id} gadget={gadget}></Product>;
            })}
        </Fade>
      </div>
    </>
  );
};
export default Products;
