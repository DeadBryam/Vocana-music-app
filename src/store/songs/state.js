export default function() {
  return {
    current: {
      info: null,
      state: {
        icon: "pause",
        time: 0
      }
    },
    search: {
      query: "",
      list: []
    },
    favorite: []
  };
}
