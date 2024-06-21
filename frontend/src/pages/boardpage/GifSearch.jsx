import { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";

function GifSearch({ setImageUrl }) {
  const GIPHY_URL = new URL("http://api.giphy.com/v1/gifs/search");
  const GIPHY_KEY = "REDACTED";
  const [gifs, setGifs] = useState(null);
  const [giphyQuery, setGiphyQuery] = useState("");

  async function fetchGifs() {
    try {
      let url = new URL(GIPHY_URL);
      url.searchParams.append("api_key", GIPHY_KEY);
      url.searchParams.append("q", giphyQuery);
      url.searchParams.append("limit", 6);

      const response = await fetch(url);
      const data = await response.json();
      if (!data) {
        throw new Error("Failed to fetch GIFs.");
      }
      setGifs(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <TextField
        value={giphyQuery}
        onChange={(e) => setGiphyQuery(e.target.value)}
        label="Search GIFs"
      />
      <Button onClick={fetchGifs} variant="outlined">
        Search
      </Button>
      <div>
        {gifs &&
          gifs.data &&
          gifs.data.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.preview_gif.url}
              onClick={() => setImageUrl(gif.images.original.url)}
            />
          ))}
      </div>
    </>
  );
}

GifSearch.propTypes = {
  setImageUrl: PropTypes.func.isRequired,
};

export default GifSearch;
