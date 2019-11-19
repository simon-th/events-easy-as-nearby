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
        major: 'Electrical & Computer Engineer',
        bio:
            'Angel is a third-year ECE major with technical cores in Software and Academic Enrichment. Her interests include drawing, pettings dogs, and watching movies.',
        responsibilities:
            'Angel worked on the frontend team to implement the UI design. She added the information for the About page, added the Explore page, and cleaned the user interface formatting. Later, she created the UI for the sidebar components and expanded the map on the map page, updated the design for Explore/Saved Events UI, and updated the About page. Afterwards, Angel designed the marker pop-up windows that displayed event information. She refined the heatmap and overall UI formatting details throughout the website and further updated the About page.'
    },
    'simon-th': {
        name: 'Simon Hoque',
        image: Simon,
        username: 'simon-th',
        major: 'Electrical & Computer Engineer',
        bio:
            'Simon is a third-year ECE major with technical cores in Software and Academic Enrichment. He spends most of his free time listening to EDM, playing soccer, and browsing on the Uniqlo website.',
        responsibilities:
            'Simon contributed mainly to the backend by structuring the git tree, setting up the hard-coded events, and working on API calls. Later, he stayed on backend to pull event information from the Eventbrite API and implemented filtering. He worked on refactoring our code as well. Afterwards, he integrated the new Eventful API to collect event information in replacement of EventBrite, then he stored restaurant information into the database.'
    },
    'yashlad': {
        name: 'Yash Lad',
        image: Yash,
        username: 'yashlad',
        major: 'Electrical & Computer Engineer',
        bio:
            'Yash is a third-year ECE major with technical cores in Software and Academic Enrichment. His hobbies consist of PC gaming, dancing, and playing basketball.',
        responsibilities:
            'Yash was on the frontend team; he implemented the initial UI structure by adding the Map page, Login/Register pages, and the Saved Events. Later, he implemented requests from the frontend sidebar controls on the map page to the background for filtering functionality and mounted a heatmap layer with hardcoded attendee weights onto the map. Afterwards, Yash integrated in nearby restaurant and parking recommendation information for specific events into the map page.'
    },
    jovinjoej: {
        name: 'Jovin Joseph',
        image: Jovin,
        username: 'jovinjoej',
        major: 'Electrical & Computer Engineer',
        bio:
            'Jovin is a fourth-year ECE major with technical cores in Software and Academic Enrichment. He enjoys photography, playing volleyball, and spending time with friends.',
        responsibilities:
            'Jovin contributed to much of the logistics; he contributed to a lot of the proposal and reports, and kept everyone on the same page. In our second phase, Jovin was in charge of frontend Selenium and completing the report details. Later, he implemented more extensive testing for both frontend and backend functionalities.'
    },
    shaniapaul: {
        name: 'Shania Paul',
        image: Shania,
        username: 'shaniapaul',
        major: 'Electrical & Computer Engineer',
        bio:
            'Shania is a third-year ECE major with technical cores in Software and Academic Enrichment. Her interests involve dancing, dancing, and more dancing (Go Texas Bhangra!!!).',
        responsibilities:
            'Shania worked on the frontend team focusing on the map implementation. She pinpointed the user geolocation for the map image and added event location markers. Later, she updated the report and displayed heatmap information on startup.'
    },
    qhuy2301: {
        name: 'Huy Le',
        image: Huy,
        username: 'qhuy2301',
        major: 'Electrical & Computer Engineer',
        bio:
            'Huy is a fifth-year ECE major with technical cores in Software and Integrated Circuit. His hobbies include playing videogames and watching sports.',
        responsibilities:
            'Huy worked on both frontend and backend. He initialized the app and redesigned the UI to be sleek with animations and displayed API data onto the webpage. In the next phase, he implemented user login verification, added an account page, and added user information into the MongoDB database. He also applied a persistent drawer and float button for more elegant UI. Afterwards, he worked on restrictive routing and saving events for registered users. In the next phase, he set up cron jobs to periodically update available events and email reminders/event changes for consistent user experience.'
    }
};

const defContributorStats = {
    'angellynncheng': {
        commits: 0,
        issues: 0,
        unitTests: 0
    },
    'simon-th': {
        commits: 0,
        issues: 0,
        unitTests: 0
    },
    'yashlad': {
        commits: 0,
        issues: 0,
        unitTests: 0
    },
    'jovinjoej': {
        commits: 0,
        issues: 0,
        unitTests: 14
    },
    'shaniapaul': {
        commits: 0,
        issues: 0,
        unitTests: 0
    },
    'qhuy2301': {
        commits: 0,
        issues: 0,
        unitTests: 4
    }
};

class AboutPage extends React.Component {
    state = {
        contributorStats: defContributorStats,
        issuesTotal: 0,
        commitsTotal: 0,
        unitTestsTotal: 0
    };

    contributorKeys = ['angellynncheng', 'simon-th', 'yashlad', 'jovinjoej', 'shaniapaul', 'qhuy2301'];

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
                  <BackSide style={{ backgroundColor: 'white', align: 'center', overflowY: 'auto'}}>
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
                    <br />
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
                        Explocation is a web application that provides a simple, effortless way for people to look up events near their area. From family-friendly events to fun nights out, Explocation has events for anyone. Need to grab a bite or park right before or after that concert or party? Plans are made easier with local food and parking recommendations.
                        </p>
                        <p>
                            Interested in our project? Visit our
                            <a href="https://github.com/simon-th/explocation/">Github Repo</a>
                        </p>
                    </Container>
                </Jumbotron>
                <h2 className="text-center">Meet the members of Team Tiger</h2>
                <p id="name">Hover over a member picture to see individual contribution, or click on it to visit their git profile</p>

                <div>{this.renderProfiles()}</div>

                <h2 className="text-center">What We Used:</h2>
                <Container>
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Statistics:</ListGroupItemHeading>
                            <ListGroupItemText tag="li">Total Commits: {commitsTotal}</ListGroupItemText>
                            <ListGroupItemText tag="li">Issues: {issuesTotal}</ListGroupItemText>
                            <ListGroupItemText tag="li">Unit Tests: {unitTestsTotal}</ListGroupItemText>
                        </ListGroupItem>

                        <CardText>
                        </CardText>

                        <ListGroupItem>
                            <ListGroupItemHeading>Data Sources:</ListGroupItemHeading>
                            <ListGroupItemText tag="li"><a href="https://api.eventful.com/" target="_blank" rel="noopener noreferrer">Eventful</a>: We took event details from the API in order to be displayed and explored on the Map, Explore, and My Events page.</ListGroupItemText>
                            <ListGroupItemText tag="li"><a href="https://developers.google.com/maps/documentation/javascript/tutorial" target="_blank" rel="noopener noreferrer">Google Maps</a>: We took the map visual and locations of interest from the Google Maps API.</ListGroupItemText>
                            <ListGroupItemText tag="li"><a href="https://developer.github.com/" target="_blank" rel="noopener noreferrer">Github</a>: We used the Github API to receive user stats from the API url.</ListGroupItemText>
                        </ListGroupItem>

                        <CardText>
                        </CardText>

                        <ListGroupItem>
                            <ListGroupItemHeading>Tools:</ListGroupItemHeading>
                            <ListGroupItemText tag="li">React(reactstrap and Material UI): Javascript Library used to design and create sleek user interface.</ListGroupItemText>
                            <ListGroupItemText tag="li">MongoDB: Database storing in event information from Google Maps, Eventbrite, and other data sources. It will also store some user data, such as from login. </ListGroupItemText>
                            <ListGroupItemText tag="li">Firebase: Development platform by Google used for user verification and password security during login.</ListGroupItemText>
                            <ListGroupItemText tag="li">Express.js: Set up for server use and connected to MongoDB. It connects the backend resources to the frontend components.</ListGroupItemText>
                            <ListGroupItemText tag="li">Selenium WebDriver: A portable framework for automated frontend testing.</ListGroupItemText>
                            <ListGroupItemText tag="li">Google Cloud Platform: Software used to deploy the web application.</ListGroupItemText>
                        </ListGroupItem>

                        <CardText>
                        </CardText>
                    </ListGroup>
                </Container>
            </Container>
        );
    }
}

export default AboutPage;
