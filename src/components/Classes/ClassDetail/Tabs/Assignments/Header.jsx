import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const Header = () => {
    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
      setSort(event.target.value);
    };
    return (
        <>
        <header className="flex justify-between items-center w-full py-2 sm:py-3 md:py-4 px-2 sm:px-3">
        <button className="flex items-center gap-2 py-2 px-4 rounded-[2rem] text-white btn">
            <span className="">
                <AiOutlinePlus />
            </span>
            <span>
                Create
            </span>
        </button>
        <FormControl variant="standard" className='min-w-[60px]'>
        <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sort}
          onChange={handleChange}
          label="Sort"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"newer"}>Newer</MenuItem>
          <MenuItem value={"older"}>Older</MenuItem>
        </Select>
      </FormControl>
        </header>   
        </>
    );
};

export default Header;