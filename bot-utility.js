module.exports = {
	receiveMessage : (msg, server) => {
		var fullCommand = msg.content.split(" ");
    	if (fullCommand[0].toLowerCase() == "#!setrole") {
    		var userToSetRole = server.members.find(member => member.displayName === fullCommand[1]);
    		var role = server.roles.find(guildRole => guildRole.name === fullCommand[2]);
    		if (userToSetRole) {
	    		if (role) {
	    			// The role exists so assign it
	    			userToSetRole.addRole(role).then(msg.channel.send(`Role ${role.name} was assigned to ${userToSetRole.displayName}`));
	    		} else {
	    			// Role doesn't exist create it
	    			server.createRole({
	    				name: fullCommand[2]
	    			}).then(roleAssign => {
	    				userToSetRole.addRole(roleAssign);
	    				msg.channel.send(`Role ${roleAssign.name} was created and assigned to ${userToSetRole.displayName}`);
	    			});
	    		}
    		} else {
    			msg.channel.send("User " + fullCommand[1] + " does not exist")
    		}
    	}
	}
}