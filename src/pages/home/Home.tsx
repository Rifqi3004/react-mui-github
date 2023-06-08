import React, { useState } from "react";
import Search from "../../components/Search";
import { styled } from "@mui/material/styles";
import { Link, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  GithubRepositoryInterface,
  ItemUser,
  ResponseGithubUsernameInterface,
} from "../../interfaces/home.interface";
import { Star } from "@mui/icons-material";
import Accordion from "../../components/Accordion";
import AccordionSummary from "../../components/AccordionSummary";
import AccordionDetails from "../../components/AccordionDetails";
import Button from "../../components/Button";
import { getRepository, getUsername } from "../../apis/home.api";

const HomeContainer = styled("div")({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  fontFamily: "Nunito Sans",
  "& .content": {
    marginTop: 20,
  },
  "& .repo": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    background: "#f3f3f3",
    padding: 10,
    borderRadius: 5,
    margin: "10px 0px",
    minHeight: 50,
  },
  "& .repo-detail": {
    width: "80%",
  },
  "& .repo-star": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
    justifyContent: "flex-end",
    paddingLeft: 20,
    "& svg": {
      marginLeft: 5,
    },
  },
  "& .notfound": {
    padding: 50,
    background: "#bfbfbf",
  },
});

function Home() {
  const [value, setValue] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [notfound, setNotFound] = useState<boolean>(false);
  const [data, setData] = useState<Array<ItemUser>>([]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  // handle change accordion
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  /**
   *
   */
  async function onSearch(): Promise<any> {
    setLoad(true);
    setNotFound(false);
    setData([]);
    try {
      const username: ResponseGithubUsernameInterface = await getUsername(
        value
      );
      if (username.items && username.items.length > 0) {
        const items: Array<ItemUser> = username.items.map((item) => {
          return { ...item };
        });
        items.map(async (item) => {
          const repository: GithubRepositoryInterface[] = await getRepository(
            item.repos_url
          );
          item.repository = repository;
          return item;
        });

        setData(items);
        setLoad(false);
      } else {
        setNotFound(true);
        setLoad(false);
      }
    } catch (error: any) {
      setLoad(false);
      setNotFound(true);
    }
  }
  return (
    <HomeContainer>
      <Search
        placeholder="Search Username"
        onSearch={onSearch}
        value={value}
        setValue={setValue}
      />
      <Button disabled={load} fullWidth variant="contained" onClick={onSearch}>
        Search
      </Button>
      <div className="content">
        {load &&
          [1, 2, 3, 4, 5].map((key) => (
            <Skeleton
              role="skeleton"
              variant="rectangular"
              width="100%"
              height={50}
              key={key}
              sx={{ mb: 2 }}
            />
          ))}

        {!load && notfound && (
          <div className="notfound">
            <Typography variant="h5" align="center">
              Opps!!!
            </Typography>
            <Typography variant="h6" align="center">
              Username not found.
            </Typography>
          </div>
        )}

        {!load &&
          data &&
          data.length > 0 &&
          data.map((item, key) => (
            <Accordion
              key={key}
              expanded={expanded === `panel${key}`}
              onChange={handleChange(`panel${key}`)}
            >
              <AccordionSummary
                aria-controls={`panel${key}d-content`}
                id={`panel${key}d-header`}
              >
                <Typography fontWeight={500} textTransform="capitalize">
                  {item.login}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item.repository &&
                  item.repository.length > 0 &&
                  item.repository.map((repo, idx) => (
                    <Link
                      href={repo.html_url}
                      underline="none"
                      target="_blank"
                      key={idx}
                    >
                      <div className="repo">
                        <div className="repo-detail">
                          <Typography fontWeight={500} variant="subtitle1">
                            {repo.name}
                          </Typography>
                          <Typography fontWeight={200} variant="caption">
                            {repo.description}
                          </Typography>
                        </div>
                        <div className="repo-star">
                          <Typography variant="subtitle2">
                            {repo.stargazers_count}
                          </Typography>
                          <Star fontSize="small" color="warning" />
                        </div>
                      </div>
                    </Link>
                  ))}
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </HomeContainer>
  );
}

export default Home;
