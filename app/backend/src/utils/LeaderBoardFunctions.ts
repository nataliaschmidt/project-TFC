import ILeaderBoard, { Match } from '../Interfaces/leaderboard/ILeaderBoard';

export default class LeaderBoardUtils {
  static calcGoalsBalance(teams: ILeaderBoard[]) {
    return teams.map((t) => ({
      ...t,
      goalsBalance: t.goalsFavor - t.goalsOwn,
    }));
  }

  static calcTotalPoints(teams: ILeaderBoard[]) {
    return teams.map((t) => ({
      ...t,
      totalPoints: (t.totalVictories * 3) + t.totalDraws,
    }));
  }

  static calcEfficiency(teams: ILeaderBoard[]) {
    return teams.map((t) => ({
      ...t,
      efficiency: ((t.totalPoints / (t.totalGames * 3)) * 100).toFixed(2),
    }));
  }

  static sortTeams(teams: ILeaderBoard[]) {
    return teams.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;

      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;

      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;

      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
  }

  static createTeamStatistics(team: Match): ILeaderBoard {
    const newTeam = {
      name: team.homeTeam,
      totalPoints: 0,
      totalGames: 1,
      totalVictories: team.homeTeamGoals > team.awayTeamGoals ? 1 : 0,
      totalDraws: team.homeTeamGoals === team.awayTeamGoals ? 1 : 0,
      totalLosses: team.homeTeamGoals < team.awayTeamGoals ? 1 : 0,
      goalsFavor: Number(team.homeTeamGoals),
      goalsOwn: Number(team.awayTeamGoals),
      goalsBalance: 0,
      efficiency: '',
    };
    return newTeam;
  }

  // static updateTeamStatistics(team: ILeaderBoard, match:Match) {
  //   team.totalGames += 1;
  //   team.totalVictories += match.homeTeamGoals > match.awayTeamGoals ? +1 : 0;
  //   team.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
  //   team.totalLosses += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
  //   team.goalsFavor += Number(match.homeTeamGoals);
  //   team.goalsOwn += Number(match.awayTeamGoals);
  // }

  static formatTeam(matches: Match[][]) {
    const teams: ILeaderBoard[] = [];

    matches.forEach((match) => {
      match.forEach((m) => {
        const hasTeam = teams.find((t) => t.name === m.homeTeam);
        if (hasTeam) {
          hasTeam.totalGames += 1;
          hasTeam.totalVictories += m.homeTeamGoals > m.awayTeamGoals ? +1 : 0;
          hasTeam.totalDraws += m.homeTeamGoals === m.awayTeamGoals ? 1 : 0;
          hasTeam.totalLosses += m.homeTeamGoals < m.awayTeamGoals ? 1 : 0;
          hasTeam.goalsFavor += Number(m.homeTeamGoals);
          hasTeam.goalsOwn += Number(m.awayTeamGoals);
        } else {
          const team = this.createTeamStatistics(m);
          teams.push(team);
        }
      });
    });
    return teams;

    // const teams: ILeaderBoard[] = [];

    // matches.forEach((match) => {
    //   match.forEach((m) => {
    //     const hasTeam = teams.find((t) => t.name === m.homeTeam);

    //     if (hasTeam) {
    //       hasTeam.totalGames += 1;
    //       hasTeam.totalVictories += m.homeTeamGoals > m.awayTeamGoals ? +1 : 0;
    //       hasTeam.totalDraws += m.homeTeamGoals === m.awayTeamGoals ? 1 : 0;
    //       hasTeam.totalLosses += m.homeTeamGoals < m.awayTeamGoals ? 1 : 0;
    //       hasTeam.goalsFavor += Number(m.homeTeamGoals);
    //       hasTeam.goalsOwn += Number(m.awayTeamGoals);
    //     } else {
    //       const team: ILeaderBoard = {
    //         name: m.homeTeam,
    //         totalPoints: 0,
    //         totalGames: 1,
    //         totalVictories: m.homeTeamGoals > m.awayTeamGoals ? 1 : 0,
    //         totalDraws: m.homeTeamGoals === m.awayTeamGoals ? 1 : 0,
    //         totalLosses: m.homeTeamGoals < m.awayTeamGoals ? 1 : 0,
    //         goalsFavor: Number(m.homeTeamGoals),
    //         goalsOwn: Number(m.awayTeamGoals),
    //         goalsBalance: 0,
    //         efficiency: '',
    //       };
    //       teams.push(team);
    //     }
    //   });
    // });

    // return teams;
  }

  static calcStatistics(matches: Match[][]) {
    console.log(matches);

    const teams = this.formatTeam(matches);

    const teamsWithGoalBalance = this.calcGoalsBalance(teams);

    const teamsWithTotalPoints = this.calcTotalPoints(teamsWithGoalBalance);

    const teamsWithEfficiency = this.calcEfficiency(teamsWithTotalPoints);

    const sortTeams = this.sortTeams(teamsWithEfficiency);

    return sortTeams;
  }
}

// const teams: ILeaderBoard[] = [];

// matches.forEach((match) => {
//   match.forEach((m) => {
//     const hasTeam = teams.find((t) => t.name === m.homeTeam);

//     if (hasTeam) {
//       hasTeam.totalGames += 1;
//       hasTeam.totalVictories += m.homeTeamGoals > m.awayTeamGoals ? +1 : 0;
//       hasTeam.totalDraws += m.homeTeamGoals === m.awayTeamGoals ? 1 : 0;
//       hasTeam.totalLosses += m.homeTeamGoals < m.awayTeamGoals ? 1 : 0;
//       hasTeam.goalsFavor += Number(m.homeTeamGoals);
//       hasTeam.goalsOwn += Number(m.awayTeamGoals);
//     } else {
//       const team: ILeaderBoard = {
//         name: m.homeTeam,
//         totalPoints: 0,
//         totalGames: 1,
//         totalVictories: m.homeTeamGoals > m.awayTeamGoals ? 1 : 0,
//         totalDraws: m.homeTeamGoals === m.awayTeamGoals ? 1 : 0,
//         totalLosses: m.homeTeamGoals < m.awayTeamGoals ? 1 : 0,
//         goalsFavor: Number(m.homeTeamGoals),
//         goalsOwn: Number(m.awayTeamGoals),
//         goalsBalance: 0,
//         efficiency: '',
//       };
//       teams.push(team);
//     }
//   });
// });

// return teams;
