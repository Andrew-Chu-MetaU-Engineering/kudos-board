import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function OptionsBanner({
  filterOption,
  handleFilterChange,
  searchQuery,
  handleSearchQuery,
  handleAddBoard,
}) {
  return (
    <>
      <TextField
        value={searchQuery}
        onChange={handleSearchQuery}
        label="Search Boards"
        variant="outlined"
      />

      <ToggleButtonGroup
        color="primary"
        value={filterOption}
        exclusive
        onChange={handleFilterChange}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="recent">Recent</ToggleButton>
        <ToggleButton value="celebration">Celebration</ToggleButton>
        <ToggleButton value="thank-you">Thank You</ToggleButton>
        <ToggleButton value="inspiration">Inspiration</ToggleButton>
      </ToggleButtonGroup>

      <Button onClick={handleAddBoard} variant="contained">
        Add Board
      </Button>
    </>
  );
}

export default OptionsBanner;

OptionsBanner.propTypes = {
  filterOption: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleSearchQuery: PropTypes.func.isRequired,
  handleAddBoard: PropTypes.func.isRequired,
};
