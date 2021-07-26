scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . f f f . . . . . .
    . . . . . . f 1 1 1 f . . . . .
    . f f . . . f 2 2 1 f . . . . .
    f 1 1 f . f 1 2 2 1 f . . f . .
    f 1 1 f . f 1 f f f f . . f . .
    f 1 1 1 f f f b b 1 f f f f . .
    f b b b 1 1 1 f f f 1 c c f f .
    f b b b 2 2 b b b b b f f 1 1 f
    . f f b 2 2 b b b b b f f b b f
    . . . f f b b 1 1 1 b f f f f .
    . . . . . f 1 1 1 1 f f f f . .
    . . . . . f 1 1 1 1 f . . f . .
    . . . . . f 1 2 2 1 f . . f . .
    . . . . . . f 2 2 1 f . . . . .
    . . . . . . f 1 1 1 f . . . . .
    . . . . . . . f f f . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . f f f . . . . . . . . .
            . . . f f 2 2 f f f f f f f f .
            2 4 5 c c 1 1 1 1 1 1 1 1 2 2 f
            2 4 5 c c b b b b b b b b 2 2 f
            . . . f f 2 2 f f f f f f f f .
            . . . . f f f . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(assets.image`bogy`, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
