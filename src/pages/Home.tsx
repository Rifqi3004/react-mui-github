import React, { useState } from 'react';
import Search from '../components/Search';
import { styled } from '@mui/material/styles';
import { Button, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { GithubRepositoryInterface, ItemUser, ResponseGithubRepositoryInterface, ResponseGithubUsernameInterface } from '../interfaces/home.interface';
import { Star } from '@mui/icons-material';
import Accordion from '../components/Accordion';
import AccordionSummary from '../components/AccordionSummary';
import AccordionDetails from '../components/AccordionDetails';

const HomeContainer = styled('div')({
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    '& .content': {
        marginTop: 20,
    },
    '& .repo': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        background: '#f3f3f3',
        padding: 10,
        borderRadius: 5,
        margin: '10px 0px',
        minHeight: 50,
    },
    '& .repo-star': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    }
});

  

function Home() {
    const [value, setValue] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);
    const [data, setData] = useState<Array<ItemUser>>([]);
    const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
    function onSearch(): void {
        // handling search
        setLoad(true);
        const headers = {
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_API}`
        };
        axios.get(`https://api.github.com/search/users?q=${value}`, {
            headers
        }).then(function ({ data }: { data: ResponseGithubUsernameInterface }) {
            if (data && data.items && data.items.length > 0) {
                const items: Array<ItemUser> = data.items.map((item) => {
                    return {...item};
                });
                items.map(async (item) => {
                    const data: ResponseGithubRepositoryInterface = await axios.get(item.repos_url, {
                        headers
                    });
                    const repository: GithubRepositoryInterface[] = data.data;
                    item.repository = repository;
                    return item;
                });

                setData(items);
            }


            setLoad(false);
		}).catch((e: any) => {
            console.log(e);
            setLoad(false);
        })
    }
    return (
        <HomeContainer>
            <Search placeholder="Search Username" value={value} setValue={setValue} />
            <Button
                disabled={load}
                fullWidth variant="contained"
                onClick={onSearch}
            >
                Search
            </Button>
            <div className="content">
                {
                    load && [1, 2, 3, 4, 5].map((key) => (
                        <Skeleton variant="rectangular" width="100%" height={50} key={key} sx={{ mb: 2 }} />
                    ))
                }

                {
                    data && data.length > 0 && data.map((item, key) => (
                        <Accordion key={key} expanded={expanded === `panel${key}`} onChange={handleChange(`panel${key}`)}>
                            <AccordionSummary aria-controls={`panel${key}d-content`} id={`panel${key}d-header`}>
                            <Typography>{item.login}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    item.repository && item.repository.length > 0 && item.repository.map((repo, idx) => (
                                        <div className='repo' key={idx}>
                                            <div className='repo-detail'>
                                                <Typography variant='subtitle1'>{repo.name}</Typography>
                                                <Typography variant='caption'>{repo.description}</Typography>
                                            </div>
                                            <div className='repo-star'>
                                                <Typography>{repo.stargazers_count}</Typography>
                                                <Star fontSize='small' color="warning" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </div>
        </HomeContainer>
    );

}

export default Home;