var threshold = 80.0;
var mods = document.getElementsByClassName('mods');
var dmg = 0.0;

var fire = '#Adds # to # Fire Damage to Attacks';
var cold = '#Adds # to # Cold Damage to Attacks';
var lightning = '#Adds # to # Lightning Damage to Attacks';
var chaos = '#Adds # to # Chaos Damage to Attacks';
var fireBow = '#Adds # to # Fire Damage to Bow Attacks';
var coldBow = '#Adds # to # Cold Damage to Bow Attacks';
var lightningBow = '#Adds # to # Lightning Damage to Bow Attacks';
var chaosBow = '#Adds # to # Chaos Damage to Bow Attacks';

var implicit = false;

for (let item of mods) {
    var mod = item;
    var childNodes = item.childNodes;
    var skip = false;

    for (let item of childNodes) {
        if (item.id == 'totalDamage') {
            skip = true;
            break;
        }
    }

    if (skip) {
        continue;
    }

    if (mod.className == 'mods withline') {
        implicit = true;
    }
    for (let item of mod.childNodes) {
        var name = item.dataset.name;
        if (name == fire || name == cold || name == lightning || name == fireBow || name == coldBow || name == lightningBow) {
            dmg += parseFloat(item.dataset.value);
        }
    }

    if (!implicit) {
        var html = '';

        if (dmg >= threshold + 20) {
            html = '<div style="background-color:crimson;color:white">Adds <b>' + dmg + '</b> Total Damage</div>';
        } else if (dmg >= threshold + 10) {
            html = '<div style="background-color:orange;color:black">Adds <b>' + dmg + '</b> Total Damage</div>';
        } else if (dmg >= threshold) {
            html = '<div style="background-color:mediumseagreen;color:black">Adds <b>' + dmg + '</b> Total Damage</div>';
        } else {
            html = 'Adds <b>' + dmg + '</b> Total Damage';
        }

        var li = document.createElement('li');
        li.className = 'sortable active';
        li.id = 'totalDamage';
        li.attributes['data-name'] = '#Adds # to # Total Damage';
        li.attributes['data-value'] = dmg;
        li.appendChild(document.createTextNode(''));
        li.innerHTML = html;

        mod.appendChild(li);
        dmg = 0.0;
        continue;
    }

    implicit = false;
}