import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

type SearchType  = {
    placeholder: string,
    value: string,
    setValue: (args: string) => void
};

const SearchContainer = styled(Paper)({
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
}) as typeof Paper;

function Search(props: SearchType) {
    const { placeholder, value, setValue } = props;
  return (
    <SearchContainer
      component="form"
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </SearchContainer>
  );
};

export default Search;
