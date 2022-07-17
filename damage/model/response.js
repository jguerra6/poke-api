// Structure for the Damage compare response
export default class DamageResponse {
	constructor({
		deal_double_damage = false,
		receive_half_damage = false,
		receive_zero_damage = false,
	}) {
		this.deal_double_damage = deal_double_damage;
		this.receive_half_damage = receive_half_damage;
		this.receive_zero_damage = receive_zero_damage;
	}
}
