import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./OptionsBanner.css";

function OptionsBanner({
  filterOption,
  handleFilterChange,
  searchQuery,
  handleSearchQuery,
  handleAddBoard,
}) {
  return (
    <span id="options-banner">
      <div id="filter">
        <ToggleButtonGroup
          color="primary"
          value={filterOption}
          exclusive
          onChange={handleFilterChange}
          className="options"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="recent">Recent</ToggleButton>
          <ToggleButton value="celebration">Celebration</ToggleButton>
          <ToggleButton value="thank-you">Thank You</ToggleButton>
          <ToggleButton value="inspiration">Inspiration</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          value={searchQuery}
          onChange={handleSearchQuery}
          label="Search Boards"
          variant="outlined"
          className="options"
        />
      </div>

      <Button onClick={handleAddBoard} variant="contained" className="options">
        Add Board
      </Button>
    </span>
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
