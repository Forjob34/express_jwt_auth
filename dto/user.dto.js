module.exports = class UserDto {
	email;
	id;
	is_role;
	is_activate;

	constructor(model) {
		this.email = model.email;
		this.id = model.id;
		this.is_role = model.is_role;
		this.is_activate = this.is_activate;
	}
};
