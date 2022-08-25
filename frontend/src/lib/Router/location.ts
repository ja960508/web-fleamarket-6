interface LocationType {
  path: string;
  params: string[];
  query: {
    [key: string]: string;
  };
}

export default (function () {
  let location: LocationType = {
    path: '',
    params: [],
    query: {},
  };

  const getLocation = () => {
    return { ...location };
  };

  const setLocation = (newLocation: LocationType) => {
    location = newLocation;
  };

  return {
    getLocation,
    setLocation,
  };
})();
