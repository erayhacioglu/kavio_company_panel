const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? 'var(--primaryColor)' : 'var(--subTextColor)',
      borderRadius: '5px',
      minHeight: '35px',
      backgroundColor: 'var(--background)',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'var(--primaryColor)'
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--background)',
      border: '1px solid var(--subTextColor)',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.06)'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? 'var(--primaryColor)' 
        : state.isFocused 
          ? 'var(--sidebarHover)' 
          : 'transparent',
      color: state.isSelected ? 'white' : 'var(--textColor)',
      cursor: 'pointer'
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'var(--sidebarHover)',
      borderRadius: '5px'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'var(--primaryColor)',
      fontWeight: '500'
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'var(--primaryColor)',
      ':hover': {
        backgroundColor: 'var(--secondBackgroundHover)',
        color: 'var(--primaryHoverColor)'
      }
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--subTextColor)'
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--textColor)'
    }),
    input: (base) => ({
      ...base,
      color: 'var(--textColor)'
    })
  };

  export default customSelectStyles