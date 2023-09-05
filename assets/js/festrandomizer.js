// Splatoon 1 Fest Regions
var s1_us = true;
var s1_eu = true;
var s1_jp = true;

// Splatoon 2 Fest Regions
var s2_us = true;
var s2_eu = true;
var s2_jp = true;

// Splatoon 3 Fests
var s3 = true;

// 2 or 3 for chosen count, other for random.
var teamCount = 2;

// Output Data
var festTeams = ["Spongebob", "Patrick"];

async function fetchTeams(game) {
    if (!game) {
        console.log("fetchTeams() was not given a game!");
        return null;
    }
    const response = await fetch(`./assets/teams/${game}.json`);
    const gamejson = await response.json();
    //console.log(gamejson);
    return gamejson;
}

async function gatherFests() {
    console.log("Attempting to gather fests!");

    const s1_data = await fetchTeams("splatoon");
    const s2_data = await fetchTeams("splatoon_2");
    const s3_data = await fetchTeams("splatoon_3");

    for (i in festTeams)
        festTeams.pop();

    if (s1_data && (s1_us || s1_eu || s1_jp)) {
        console.log(`Gathering fests for ${s1_data.name.en_us}! (${s1_data.name.jp_jp})`);
        for (var i = 0; i < s1_data.teams.length; i++) {
            festTeams.push(s1_data.teams[i].alpha);
            festTeams.push(s1_data.teams[i].bravo);
        }
    }

    if (s2_data && (s2_us || s2_eu || s2_jp)) {
        console.log(`Gathering fests for ${s2_data.name.en_us}! (${s2_data.name.jp_jp})`);
        for (var i = 0; i < s2_data.teams.length; i++) {
            festTeams.push(s2_data.teams[i].alpha);
            festTeams.push(s2_data.teams[i].bravo);
        }
    }

    if (s3_data && s3) {
        console.log(`Gathering fests for ${s3_data.name.en_us}! (${s3_data.name.jp_jp})`);
        for (var i = 0; i < s3_data.teams.length; i++) {
            festTeams.push(s3_data.teams[i].alpha);
            festTeams.push(s3_data.teams[i].bravo);
            festTeams.push(s3_data.teams[i].charlie);
        }
    }

    console.log(festTeams);
}