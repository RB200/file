AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {
        var enemyEntity = document.querySelectorAll('.enemy')

        console.log(enemyEntity)
        
        for(var i = 0; i<enemyEntity.length;i++){
            var enemyBullet = document.createElement('a-entity')
            enemyBullet.setAttribute('geometry',{
                primitive:'sphere',
                radius:0.1
            })
            enemyBullet.setAttribute('material','color','#282b29')
            var position = enemyEntity[i].getAttribute('position')
            enemyBullet.setAttribute('position',{
                x:position.x + 1.5,
                y:position.y + 3.5,
                z:position.z
            })
            var scene = document.querySelector('#scene')
            scene.appendChild(enemyBullet)

            var pos1 = new THREE.Vector3()
            var pos2 = new THREE.Vector3()

            var enemy = enemyEntity[i].object3D()
            var player = document.querySelector('#weapon').object3D()

            player.getWorldPosition(pos1)
            enemy.getWorldPosition(pos2)

            var direction = new THREE.Vector3()
            direction.subVectors(pos1,pos2).normalize()

            enemyBullet.setAttribute('velocity',direction.multiplyScalar(10))
            enemyBullet.setAttribute('dynamic-body',{
                shape:'sphere',
                mass:'0'
            })
        }
    },

});