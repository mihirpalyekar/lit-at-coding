import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  tableCellClasses,
  styled,
  Chip,
  Button,
  CircularProgress,
  Backdrop,
  TextField
} from '@mui/material';
import { companyName } from "./../tableData/company";

const fetchQuestions = async ({ queryKey }) => {
  const [{ page, limit, filterDifficulty, filterCompanyName, filterTagName, sortField, sortOrder }] = queryKey;
  const params = new URLSearchParams({
    page,
    limit,
    filterDifficulty,
    filterCompanyName,
    filterTagName,
    sortField,
    sortOrder,
  });

  const res = await fetch(`/api/questions?${params.toString()}`);
  return res.json();
};

// Function to get color based on difficulty
const getChipColor = (difficulty) => {
  switch (difficulty) {
    case 'EASY':
      return '#4CAF50'; // Green for EASY
    case 'MEDIUM':
      return '#FFC107'; // Amber for MEDIUM
    case 'HARD':
      return '#F44336'; // Red for HARD
    default:
      return '#3fb4b4'; // Default color (Medium Sea Green)
  }
};

// Array of colors to randomly choose from
const colorPalette = [
  '#5F9EA0', // Cadet Blue
  '#6495ED', // Cornflower Blue
  '#3CB371', // Medium Sea Green
  '#BDB76B', // Dark Khaki
  '#BC8F8F', // Rosy Brown
  '#CD5C5C', // Indian Red
  '#7B68EE', // Medium Slate Blue
  '#6B8E23', // Olive Green
  '#DAA520', // Goldenrod
  '#4682B4', // Steel Blue
  '#BA55D3', // Medium Orchid
  '#008080', // Teal
  '#708090', // Slate Gray
  '#CD853F', // Peru
  '#E9967A', // Dark Salmon
];

// Function to get a random color
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[randomIndex];
};

// Custom debounce hook using native JavaScript
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to cancel the timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function QuestionTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterCompanyName, setFilterCompanyName] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterTagName, setFilterTagName] = useState('');
   // Use the custom debounce hook
   const debouncedFilterTagName = useDebounce(filterTagName, 1000);
  const { data, isLoading, error } = useQuery({
    queryKey: [{ page, limit, filterDifficulty, filterCompanyName, filterTagName:debouncedFilterTagName, sortField, sortOrder }],
    queryFn: fetchQuestions,
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.augmentColor({
        color: {
          main: '#292929',
        },
        name: 'Dark Slate Gray',
      }).main,
      color: theme.palette.common.white,
      fontWeight: 600
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 2,
    },
  }));

  const handleFilterDifficultyChange = (event) => setFilterDifficulty(event.target.value);
  const handleFilterCompanyNameChange = (event) => setFilterCompanyName(event.target.value);
  const handleSortFieldChange = (event) => setSortField(event.target.value);
  const handleSortOrderChange = (event) => setSortOrder(event.target.value);



  // Handle change to update input state
  const handleChange = (event) => {
    setFilterTagName(event.target.value); // Update state immediately
  };

  if (isLoading) return (
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  );
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2}>
            <TextField
              variant="outlined"
              label="Filter Title"
              onChange={handleChange}
              fullWidth
              value={filterTagName}
            />
          </Grid>
        <Grid item xs={6} md={2}>
          <FormControl variant="outlined" style={{ marginRight: '1rem', width: '100%' }}>
            <InputLabel>Difficulty</InputLabel>
            <Select value={filterDifficulty} onChange={handleFilterDifficultyChange} label="Difficulty">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="EASY">Easy</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HARD">Hard</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControl variant="outlined" style={{ marginRight: '1rem', width: '100%' }}>
            <InputLabel>Company Name</InputLabel>
            <Select value={filterCompanyName} onChange={handleFilterCompanyNameChange} label="Company Name">
              <MenuItem value="">All</MenuItem>
              {Object.keys(companyName).map((company) => (
                <MenuItem key={company} value={company}>{companyName[company]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControl variant="outlined" style={{ marginRight: '1rem', width: '100%' }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortField} onChange={handleSortFieldChange} label="Sort By">
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="frequencyCount">Frequency Count</MenuItem>
              <MenuItem value="difficulty">Difficulty</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl variant="outlined" style={{ marginRight: '1rem', width: '100%' }}>
            <InputLabel>Sort Order</InputLabel>
            <Select value={sortOrder} onChange={handleSortOrderChange} label="Sort Order">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer sx={{ maxHeight: 640 }} style={{ marginTop: '1rem', border:'1px solid #ccc' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Difficulty</StyledTableCell>
              <StyledTableCell>Frequency Count</StyledTableCell>
              <StyledTableCell>Topics</StyledTableCell>
              <StyledTableCell>Company Names</StyledTableCell>
              <StyledTableCell>Link</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.questions.map((question) => (
              <StyledTableRow key={question.id}>
                <StyledTableCell>{question.id}</StyledTableCell>
                <StyledTableCell style={{ fontWeight: '600', textTransform: 'uppercase' }}>
                  {question.title}</StyledTableCell>
                <StyledTableCell>
                  <Chip
                    key={question.difficulty}
                    label={question.difficulty}
                    sx={{
                      backgroundColor: getChipColor(question.difficulty), // Medium Sea Green
                      color: '#fff',
                      margin: '2px'
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>{question.frequencyCount}</StyledTableCell>
                <StyledTableCell style={{ fontWeight: '600', textTransform: 'uppercase' }}>
                  {question.topics.map((ele,index) => {
                    return (<Chip
                    key={index}
                    label={ele.name}
                    sx={{
                      backgroundColor: getRandomColor(), // Medium Sea Green
                      color: '#fff',
                      margin: '2px'
                    }}
                  />)
                  })}</StyledTableCell>
                <StyledTableCell><div style={{ display: 'flex', flexFlow: 'wrap', gap: '1rem' }}>
                  {question.companyNames.map((company, index) => (companyName[company] &&
                    <Chip
                      key={index}
                      label={companyName[company]}
                      sx={{
                        backgroundColor: getRandomColor(), // Medium Sea Green
                        color: '#fff',
                        margin: '2px'
                      }}
                    />
                  ))}
                </div>
                </StyledTableCell>
                <StyledTableCell> <Button variant="contained" target='_' href={question.url}>
                  Link
                </Button>  </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        style={{ border:'1px solid #ccc', borderTop: 'None' }}
        component="div"
        count={data.total}
        page={page - 1}
        onPageChange={(event, newPage) => setPage(newPage + 1)}
        rowsPerPage={limit}
        onRowsPerPageChange={(event) => setLimit(parseInt(event.target.value, 10))}
      />
    </div>
  );
}
