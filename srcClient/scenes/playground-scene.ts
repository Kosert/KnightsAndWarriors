import { Team } from "../data/team"
import { Warrior } from "../objects/units/warrior"
import "util"
import { Knight } from "../objects/units/knight"
import { Archer } from "../objects/units/archer"
import { BaseBattleScene } from "./base-battle-scene"
import { GameSettings } from "./game-settings"
import { Gate } from "../objects/gate"

export class PlaygroundBattleScene extends BaseBattleScene {

    static readonly sceneKey: string = "PlaygroundBattleScene"
    readonly sceneKey: string = PlaygroundBattleScene.sceneKey

    private buttons: Phaser.GameObjects.Components.Visible[] = []

    constructor() {
        super({ key: PlaygroundBattleScene.sceneKey })
    }

    create(data: GameSettings) {
        super.create(data)
        const self = this

        const button = this.add.rectangle(100, 100, 100, 100, 0x0000ff).setInteractive().setScrollFactor(0).setDepth(90)
        this.buttons.push(this.add.sprite(100, 90, "warrior_idle", 0).setScrollFactor(0).setDepth(91))
        const buttonK = this.add.rectangle(250, 100, 100, 100, 0x0000ff).setInteractive().setScrollFactor(0).setDepth(90)
        this.buttons.push(this.add.sprite(250, 90, "knight_idle", 0).setScrollFactor(0).setDepth(91))
        const buttonA = this.add.rectangle(400, 100, 100, 100, 0x0000ff).setInteractive().setScrollFactor(0).setDepth(90)
        this.buttons.push(this.add.sprite(400, 120, "archer_idle", 0).setScrollFactor(0).setDepth(91))

        button.on("pointerdown", function () {
            const warrior = new Warrior(self, self.getSpawnPosition(Team.Left), self.cameras.main.height - 120, Team.Left)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
        buttonK.on("pointerdown", function () {
            const warrior = new Knight(self, self.getSpawnPosition(Team.Left), self.cameras.main.height - 120, Team.Left)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
        buttonA.on("pointerdown", function () {
            const warrior = new Archer(self, self.getSpawnPosition(Team.Left), self.cameras.main.height - 120, Team.Left)
            self.units.push(warrior)
            self.add.existing(warrior)
        })

        const button2 = this.add.rectangle(self.cameras.main.width - 500, 100, 100, 100, 0xff0000).setInteractive().setScrollFactor(0).setDepth(90)
        this.buttons.push(this.add.sprite(self.cameras.main.width - 500, 90, "warrior_idle", 0).setScrollFactor(0).setDepth(91))
        const buttonK2 = this.add.rectangle(self.cameras.main.width - 350, 100, 100, 100, 0xff0000).setInteractive().setScrollFactor(0).setDepth(90)
        this.buttons.push(this.add.sprite(self.cameras.main.width - 350, 90, "knight_idle", 0).setScrollFactor(0).setDepth(91))
        const buttonA2 = this.add.rectangle(self.cameras.main.width - 200, 100, 100, 100, 0xff0000).setInteractive().setScrollFactor(0).setDepth(90)
        this.buttons.push(this.add.sprite(self.cameras.main.width - 200, 120, "archer_idle", 0).setScrollFactor(0).setDepth(91))
        this.buttons.push(button, buttonK, buttonA, button2, buttonK2, buttonA2)

        button2.on("pointerdown", function () {
            const warrior = new Warrior(self, self.getSpawnPosition(Team.Right), self.cameras.main.height - 120, Team.Right)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
        buttonK2.on("pointerdown", function () {
            const warrior = new Knight(self, self.getSpawnPosition(Team.Right), self.cameras.main.height - 120, Team.Right)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
        buttonA2.on("pointerdown", function () {
            const warrior = new Archer(self, self.getSpawnPosition(Team.Right), self.cameras.main.height - 120, Team.Right)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
    }
 
    initWorld() {
        super.initWorld()
        this.buttons.forEach(it => it.setVisible(true))
    }

    private getSpawnPosition(team: Team) {
        let defaultPosition: number
        if (team == Team.Left) 
            defaultPosition = 30
        else 
            defaultPosition = this.gameSettings.mapSize - 30

        const positions = this.units
            .filter((it) => it.team == team)
            .map((it) => it.x)
            .concat(defaultPosition)

        if (team == Team.Left) 
            return positions.minBy((it) => it) - 10
        else 
            return positions.maxBy((it) => it) + 10
    }

    update(time: number, delta: number) {
        super.update(time, delta)

        if (!this.gateLeft.isAlive() || !this.gateRight.isAlive()) {
            this.buttons.forEach(it => it.setVisible(false))
        }
    }
}
