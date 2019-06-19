import React, { Component } from 'react';
import * as local from './squads.module.css';
import { connect } from 'react-redux';
import { fetchAllClubs, fetchAllPlayers } from '../../actions';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Squads extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentClubIndex: 0
        };
    }

    componentDidMount() {
        this.props.fetchAllClubs();
        this.props.fetchAllPlayers();
    }

    renderClubList(club, index) {
        return (
            <div
                className={local.clubContainer_item}
                onClick={() => {
                    this.setState({
                        currentClubIndex: index
                    });
                }}
                style={(this.state.currentClubIndex === index) ? { background: "white", width: "100%" } : { background: "rgba(255, 255, 255, 0.7)", width: "95%" }}
            >
                <img
                    src={club.clubLogo}
                    alt="club"
                    className={local.clubContainer_item_image}
                />
                <p className={local.clubContainer_item_name}>{club.club}</p>
            </div>
        );
    }

    renderPlayer(player) {
        return (
            <Col xs={6} lg={2} md={2}>
                <div className={local.playerThumbnail}>
                    <img
                        src={player.profilePhoto}
                        alt="player-profile"
                        className={local.playerThumbnail_image}
                    />
                    <div className={local.playerThumbnail_datasection}>
                        <p className={local.playerThumbnail_data}>{player.name} {player.overall}XP</p>
                        <p className={local.playerThumbnail_data}>{player.position} {player.soldPrice}</p>
                    </div>
                </div>
            </Col>
        );
    }

    render() {
        console.log(this.state);

        if (Object.entries(this.props.clubs).length === 0) {
            return (
                <div>
                    Fetching all data...
                </div>
            );
        }

        return (
            <Grid fluid>
                <Row>
                    <Col lg={3} md={3} xs={3}>
                        <div className={local.clubContainer}>
                            {this.props.clubs.map((club, index) => this.renderClubList(club, index))}
                        </div>
                    </Col>
                    <Col lg={9} md={9} xs={9}>
                        <h4>{this.props.clubs[this.state.currentClubIndex].club}</h4>
                        <p>{this.props.clubs[this.state.currentClubIndex].clubBudget} FPS</p>

                        <Row>
                            {this.props.clubs[this.state.currentClubIndex].players.map((player) => this.renderPlayer(player))}
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        clubs: state.clubs
    };
}

export default connect(mapStateToProps, { fetchAllClubs, fetchAllPlayers })(Squads);