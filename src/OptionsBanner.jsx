import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function OptionsBanner({ filterOption, handleFilterChange }) {
  return (
    <>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <ToggleButtonGroup
        color="primary"
        value={filterOption}
        exclusive
        onChange={handleFilterChange}
        aria-label="Platform"
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="recent">Recent</ToggleButton>
        <ToggleButton value="celebration">Celebration</ToggleButton>
        <ToggleButton value="thank-you">Thank You</ToggleButton>
        <ToggleButton value="inspiration">Inspiration</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default OptionsBanner;

OptionsBanner.propTypes = {
  filterOption: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
