const style = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    margin: 'auto',
    maxWidth: '500px',
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    color: 'black',
  }),
  option: (provided, state) => {
    if (state.isFocused) {
      return { ...provided, cursor: 'pointer', backgroundColor: '#c8c8c8' }
    }
    return { ...provided, cursor: 'pointer' }
  },
}


export default style
