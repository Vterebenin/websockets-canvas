export default class SpellBook {
  constructor (props) {
    this.attackSpell = props.attackSpell
    this.player = props.player
  }

  castAttackSpell () {
    this.attackSpell.cast(this.player)
  }
}
