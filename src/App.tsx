import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import SlideDialog from './SlideDialog';
import SimpleBackdrop from './SimpleBackdrop';

const apiUrl = 'https://jsonplaceholder.typicode.com/';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  visibility: boolean;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchBar, setSearchBar] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    const searchedUsers = users.map((user: User) => {
      if (!user.name.toLowerCase().startsWith(searchBar.toLowerCase())) {
        user.visibility = false;
      } else {
        user.visibility = true;
      }
      return user;
    });
    setUsers(searchedUsers);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl + 'users');
        const data = await response.json();
        const newUsers = data.map((user: User) => {
          user.visibility = true;
          return user;
        });
        setUsers(newUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const googleMapUrl = (user: User) => {
    return `https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`;
  };

  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  };

  const iconStyle = {
    width: '50px',
    height: '50px',
    color: 'black',
  };

  const formatEmail = (user: User) => {
    return (
      <Typography>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </Typography>
    );
  };

  const formatAddress = (user: any) => {
    const keys = ['street', 'suite', 'city', 'zipcode'];
    return (
      <List>
        {keys.map((key, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={key.charAt(0).toUpperCase() + key.slice(1)}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {user.address[key]}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  };

  const formatPhone = (user: User) => {
    return (
      <Typography>
        <a href={`tel:${user.phone}`}>{user.phone}</a>
      </Typography>
    );
  };

  const formatWebsite = (user: User) => {
    return (
      <Typography>
        <a href={`${user.website}`}>{user.website}</a>
      </Typography>
    );
  };

  const formatCompany = (user: any) => {
    const keys = ['name', 'catchPhrase', 'bs'];
    return (
      <Card>
        <CardContent sx={{ overflowY: 'auto', maxHeight: '50px' }}>
          <List>
            {keys.map((key, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    'Company ' + key.charAt(0).toUpperCase() + key.slice(1)
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {user.company[key]}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

  return (
    <Stack
      className='App'
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        p: 4,
        backgroundColor: '#939395',
        color: 'white',
        minHeight: '100vh',
        height: '100%',
      }}
    >
      <SimpleBackdrop openOn={isLoading} />
      <Card
        sx={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          justifyContent: 'center',
          alignSelf: 'center',
          width: '480px',
          p: 2,
          borderRadius: '20px',
          zIndex: 2,
        }}
      >
        <CardContent>
          <TextField
            placeholder='Type a name...'
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
          ></TextField>
          <Button
            variant='contained'
            onClick={handleClick}
            sx={{
              height: '100%',
              marginLeft: '2em',
            }}
          >
            Search
          </Button>
        </CardContent>
      </Card>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          paddingTop: '13vh'
        }}
      >
        {users.map((user, index) => (
          <Card
            key={index}
            sx={{
              display: user.visibility ? 'block' : 'none',
              borderRadius: '20px',
              height: '480px',
              width: '480px',
              p: 2,
              ':hover': {
                boxShadow: 10,
              },
            }}
          >
            <CardContent>
              <Grid
                container
                spacing={2}
                sx={{
                  display: 'flex',
                  position: 'relative',
                }}
              >
                <Grid item xs={12} sx={cardStyle}>
                  <AccountCircleIcon
                    sx={{
                      width: '150px',
                      height: '150px',
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xs={1}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 30,
                  }}
                >
                  <a href={googleMapUrl(user)}>
                    <IconButton>
                      <MapIcon
                        fontSize='large'
                        sx={{
                          color: 'black',
                        }}
                      />
                    </IconButton>
                  </a>
                </Grid>

                <Grid item xs={12} sx={cardStyle}>
                  <Typography variant='h5' fontWeight={500}>
                    {user.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={cardStyle}>
                  <Typography variant='subtitle2' sx={{ fontSize: 'large' }}>
                    <i>{user.username}</i>
                  </Typography>
                </Grid>

                <Grid item xs={3} sx={cardStyle}>
                  <SlideDialog
                    title='Email'
                    content={formatEmail(user)}
                    trigger={
                      <IconButton>
                        <EmailIcon sx={iconStyle} />
                      </IconButton>
                    }
                  />
                </Grid>
                <Grid item xs={3} sx={cardStyle}>
                  <SlideDialog
                    title='Address'
                    content={formatAddress(user)}
                    trigger={
                      <IconButton>
                        <HomeIcon sx={iconStyle} />
                      </IconButton>
                    }
                  />
                </Grid>
                <Grid item xs={3} sx={cardStyle}>
                  <SlideDialog
                    title='Contact'
                    content={formatPhone(user)}
                    trigger={
                      <IconButton>
                        <PhoneIcon sx={iconStyle} />
                      </IconButton>
                    }
                  />
                </Grid>
                <Grid item xs={3} sx={cardStyle}>
                  <SlideDialog
                    title='Website'
                    content={formatWebsite(user)}
                    trigger={
                      <IconButton>
                        <LanguageIcon sx={iconStyle} />
                      </IconButton>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  {formatCompany(user)}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}

export default App;
