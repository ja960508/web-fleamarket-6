interface LocationType {
  path: string;
  params: string[];
}

export default (function () {
  let location: LocationType = {
    path: '',
    params: [],
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
