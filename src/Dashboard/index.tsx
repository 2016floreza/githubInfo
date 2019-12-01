import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Redirect } from "react-router";
import { TokenContext } from "../components/TokenContext";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue"
  },
  card: {
    minWidth: 400
  },
  cardContent: {
    display: "flex"
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 32
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },
  login: {
    alignSelf: "flex-end"
  },
  bio: {
    fontStyle: "italic",
    margin: "8px 0px"
  },
  moreInfo: {
    margin: "8px 0px"
  }
});

interface IRes {
  data: null;
  complete: boolean;
  pending: boolean;
  error: boolean;
}

const Dashboard: React.FC = () => {
  const classes = useStyles();

  const tokenContext = useContext(TokenContext);
  const [resUser, setResUser] = useState<IRes>({
    data: null,
    complete: false,
    pending: false,
    error: false
  });

  const [resUserRepos, setResUserRepos] = useState<IRes>({
    data: null,
    complete: false,
    pending: false,
    error: false
  });

  const [resUserOrgs, setResUserOrg] = useState<IRes>({
    data: null,
    complete: false,
    pending: false,
    error: false
  });

  useEffect(() => {
    if (tokenContext && tokenContext[0]) {
      axios.defaults.headers.common = {
        Authorization: `token ${tokenContext[0]}`
      };

      axios
        .get(`https://api.github.com/user`)
        .then(response => {
          setResUser({
            data: response.data,
            complete: true,
            pending: false,
            error: false
          });

          axios
            .get(response.data.repos_url)
            .then(response => {
              setResUserRepos({
                data: response.data,
                complete: true,
                pending: false,
                error: false
              });
            })
            .catch(() => {
              setResUserRepos({
                data: null,
                complete: true,
                pending: false,
                error: true
              });
            });

          axios
            .get(response.data.organizations_url)
            .then(response => {
              setResUserOrg({
                data: response.data,
                complete: true,
                pending: false,
                error: false
              });
            })
            .catch(() => {
              setResUserOrg({
                data: null,
                complete: true,
                pending: false,
                error: true
              });
            });
        })
        .catch(() => {
          setResUser({
            data: null,
            complete: true,
            pending: false,
            error: true
          });
        });
    }
  }, [tokenContext]);

  if (!tokenContext) {
    return <Redirect to="/" />;
  }

  if (!tokenContext[0]) {
    return <Redirect to="/" />;
  }

  if (
    resUser.data === null ||
    resUserRepos.data === null ||
    resUserOrgs.data === null
  ) {
    return <div>No information</div>;
  }

  if (resUser.error || resUserRepos.error || resUserOrgs.error) {
    return <div>An error occured please retry</div>;
  }

  // If not put as any, the object is consider as possibly null in some cases
  const responseCardUserInfo: any = resUser.data;
  const responseCardUserReposInfo: any = resUserRepos.data;
  const responseCardUserOrgasInfo: any = resUserOrgs.data;

  const sortValuableInfo = (array: any[]) => {
    return array
      .sort((a: any, b: any) => {
        if (a.stargazers_count < b.stargazers_count) return 1;
        else if (a.stargazers_count > b.stargazers_count) return -1;
        return 0;
      })
      .slice(0, 3);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <img
            src={responseCardUserInfo.avatar_url}
            alt="Avatar"
            className={classes.img}
          />
          <div className={classes.infoContainer}>
            <div className={classes.name}>{responseCardUserInfo.name}</div>
            <div className={classes.login}>{responseCardUserInfo.login}</div>
            <div className={classes.bio}>
              {responseCardUserInfo.bio || "No bio"}
            </div>
            <div>
              Number of repositories :{" "}
              {(responseCardUserInfo.public_repos || 0) +
                (responseCardUserInfo.total_private_repos || 0)}
            </div>
            <div>Number of commits :</div>

            <div className={classes.moreInfo}>
              Repositories:
              {sortValuableInfo(responseCardUserReposInfo).map((repo: any) => {
                return <li key={repo.id}>{repo.name}</li>;
              })}
            </div>
            <div className={classes.moreInfo}>
              Organisations:
              {responseCardUserOrgasInfo.map((repo: any) => {
                return <li key={repo.id}>{repo.name}</li>;
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
