import React from 'react';
import './About.css';
import {
    Card,
    CardImg,
    CardText,
    Container,
    CardDeck,
    CardHeader,
    Jumbotron,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from 'reactstrap';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Angel from './angel.jpg';
import Simon from './simon.jpg';
import Yash from './yash.jpg';
import Jovin from './jovin.jpg';
import Shania from './shania.jpg';
import Huy from './huy.jpg';

const contributorInfo = {
    angellynncheng: {
        name: 'Angel Cheng',
        image: Angel,
        username: 'angellynncheng',
        major: 'Electrical & Computer Enginner',
        bio:
            'Add your bio',
        responsibilities:
            'Add your responsibilities'
    },
    'simon-th': {
        name: 'Simon Hoque',
        image: Simon,
        username: 'simon-th',
        major: 'Electrical & Computer Engineer',
        bio:
            'Add your bio',
        responsibilities:
            'Add your responsibilities'
    },
    'ifis98': {
        name: 'Yash Lad',
        image: Yash,
        username: 'ifis98',
        major: 'Electrical & Computer Engineer',
        bio:
            'Add your bio',
        responsibilities:
            'Add your responsibilities'
    },
    jovinjoej: {
        name: 'Jovin Joseph',
        image: Jovin,
        username: 'jovinjoej',
        major: 'Electrical & Computer Engineer',
        bio:
            'Add your bio',
        responsibilities:
            'Add your responsibilities'
    },
    shaniapaul: {
        name: 'Shania Paul',
        image: Shania,
        username: 'shaniapaul',
        major: 'Electrical & Computer Engineer',
        bio:
            'Add your bio',
        responsibilities:
            'Add your responsibilities'
    },
    qhuy2301: {
        name: 'Huy Le',
        image: Huy,
        username: 'qhuy2301',
        major: 'Electrical & Computer Engineer',
        bio:
            'Add your bio',
        responsibilities:
            'Add your responsibilities'
    }
};

const defContributorStats = {
    angellynncheng: {
        commits: 0,
        issues: 0,
        unitTests: 0
    },
    'simon-th': {
        commits: 0,
        issues: 0,
        unitTests: 0
    },
    'ifis98': {
        commits: 0,
        issues: 0,
        unitTests: 0
    },
    jovinjoej: {
        commits: 0,
        issues: 0,
        unitTests: 0
    },
    shaniapaul: {
        commits: 0,
        issues: 0,
        unitTests: 0
    },
    qhuy2301: {
        commits: 0,
        issues: 0,
        unitTests: 0
    }
};

class AboutPage extends React.Component {
    state = {
        contributorStats: defContributorStats,
        issuesTotal: 0,
        commitsTotal: 0,
        unitTestsTotal: 0
    };

    contributorKeys = ['angellynncheng', 'simon-th', 'ifis98', 'jovinjoej', 'shaniapaul', 'qhuy2301'];

    componentDidMount() {
        console.log('componentDidMount');
        this.fetchGithubStats();
    }

    attemptFetch = async (url, n) => {
        let error;
        for (let i = 0; i < n; i++) {
            try {
                // fetch() and json() are asynchronous
                // we use await to make the main thread wait until the asynchronous thread terminates and returns a value
                const response = await fetch(url); // make get request to url and wait until response is returned
                console.log('fetch response', response);
                if (response.status === 200) {
                    const data = await response.json(); // convert response to a json object and wait until the data is returned
                    console.log('data', data);
                    return data;
                }
            } catch (err) {
                error = err;
            }
        }
        throw error;
    };

    async fetchCommits() {
        let commitsTotal = 0;
        const url = 'https://api.github.com/repos/simon-th/explocation/stats/contributors';

        try {
            const data = await this.attemptFetch(url, 3);
            // loop through array
            console.log('fetchCommits', data);
            data.forEach(contributor => {
                const username = contributor.author.login;
                defContributorStats[username].commits = contributor.total;
                commitsTotal += contributor.total;
            });

            this.setState({ commitsTotal });
        } catch (err) {
            console.log('error fetching stats check connection');
        }
    }

    async fetchIssues() {
        let issuesTotal = 0;
        const url = 'https://api.github.com/repos/simon-th/explocation/issues';

        try {
            const data = await this.attemptFetch(url, 3);
            console.log('fetchIssues', data);
            data.forEach(issue => {
                const username = issue.user.login;
                defContributorStats[username].issues++;
                issuesTotal++;
            });

            this.setState({ issuesTotal });
        } catch (err) {
            console.log('error fetching stats check connection');
        }
    }

    fetchGithubStats() {
        this.fetchIssues();
        this.fetchCommits();
        this.calculateUnitTests();
        this.setState({ contributorStats: defContributorStats });
    }

    calculateUnitTests() {
        let unitTestsTotal = 0;
        this.contributorKeys.forEach(username => {
            unitTestsTotal += defContributorStats[username].unitTests;
        });
        this.setState({ unitTestsTotal });
    }

    renderProfile(id) {
        const username = this.contributorKeys[id];
        const { contributorStats } = this.state;

        return (
          <Card
                key={id}
                body
                style={{cursor: 'pointer', padding: '0'}}
                width="80%"
                className="text-center"
                tag="a"
                onClick={() => window.open(`https://github.com/${username}`)}
            >
            <CardHeader className="text-center" tag="name">
                      {contributorInfo[username].name}
                  </CardHeader>
              <Flippy
                  flipOnHover={true}
                  flipOnClick={false}
                  flipDirection="horizontal"
                  ref={(r) => this.flippy = r}
              >
                  <FrontSide style={{align: 'center', padding: '0'}}>
                      <CardImg top width="100%" src={contributorInfo[username].image} alt="Error" style={{align: 'center'}} />
                  </FrontSide>
                  <BackSide style={{ backgroundColor: 'white', align: 'center'}}>
                      <p id="b">Major: {contributorInfo[username].major}<br/>
                      Username: {contributorInfo[username].username}<br/>
                      Commits: {contributorStats[username].commits}<br/>
                      Issues: {contributorStats[username].issues}<br/>
                      Unit Tests: {contributorStats[username].unitTests}<br/>
                      </p>
                      <p id="b">Bio: {contributorInfo[username].bio}</p>
                      <p id="b">Responsibilities: {contributorInfo[username].responsibilities}</p>
                  </BackSide>
              </Flippy>
            </Card>
        );
    }

    renderProfiles() {
        const profiles = [];
        for (let id = 0; id < this.contributorKeys.length; id += 3) {
            // render each row
            profiles.push(
                <Container key={id}>
                    <CardDeck tag="cd" style = {{align: 'center'}}>
                        {this.renderProfile(id)}
                        {this.renderProfile(id + 1)}
                        {this.renderProfile(id + 2)}
                    </CardDeck>
                    <CardText>
                        <CardText> </CardText>
                    </CardText>
                </Container>
            );
        }
        return profiles;
    }

    render() {
        const { commitsTotal, issuesTotal, unitTestsTotal } = this.state;
        return (

            <Container>
                <Jumbotron style={{backgroundColor:'c1cadb'}} fluid>
                    <Container fluid>
                        <h1 className="display-3">What is Explocation?</h1>
                        <p className="lead">
                            Project description
                        </p>
                        <p>
                            Interested in our project? Visit our
                            <a href="https://github.com/simon-th/explocation/">Github Repo</a>
                        </p>
                    </Container>
                </Jumbotron>
                <h2 id="name">Meet the Team Members</h2>
                <p id="name">Hover over a member picture to see individual contribution, or click on it to visit their git profile</p>

                <div>{this.renderProfiles()}</div>

                <Container>
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Statistics:</ListGroupItemHeading>
                            <ListGroupItemText tag="li">Total Commits: {commitsTotal}</ListGroupItemText>
                            <ListGroupItemText tag="li">Issues: {issuesTotal}</ListGroupItemText>
                            <ListGroupItemText tag="li">Unit Tests: {unitTestsTotal}</ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemHeading>Data Sources:</ListGroupItemHeading>

                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemHeading>Tools:</ListGroupItemHeading>
                        </ListGroupItem>
                    </ListGroup>
                </Container>
            </Container>
        );
    }
}

export default AboutPage;
