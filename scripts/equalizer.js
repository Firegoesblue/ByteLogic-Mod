const tilel = require("tilelib");
const equalizer = extendContent(Block, "equalizer", {
	update(tile){
		entity = tile.ent();
    	if(tilel.isMod(tile.left()) && tilel.isMod(tile.right()) && tilel.pointingAt(tile.left(), tile) && tilel.pointingAt(tile.right(), tile)){
        	if(tile.right().ent().getSignal()==tile.left().ent().getSignal()){
        		entity.setSignal(tile.left().ent().getSignal());
        	} else {
    			entity.setSignal(0);
    		}
    	} else {
    		entity.setSignal(0);
    	}
    	if(tilel.isMod(tile.front()) && tile.front().ent().asignal() == true && !tilel.pointingAt(tile.front(), tile)){
            tile.front().ent().setSignal(entity.getSignal());
        }
	},
	generateIcons(){
		return[
			Core.atlas.find("bytmod-logic-base"),
			Core.atlas.find(this.name)
		]
	},
	draw(tile){
		entity = tile.ent();
		Draw.rect(Core.atlas.find("bytmod-logic-base"), tile.drawx(), tile.drawy());
		Draw.color(entity.getSignal() > 0 ? Pal.accent : Color.white);
		Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), tile.rotation()*90);
  		Draw.reset();
  	},
  	setBars(){
  		this.super$setBars();
  		this.bars.add("signal", new Func({
				get: function(entity){
					return new Bar(prov(() => (Core.bundle.get("bar.signal") + ": " + entity.getSignal())), prov(() => Pal.ammo), new Floatp({get: function(){
						return entity.getSignal();
					}
				}));
			}
		}));
  	}
});
equalizer.category = Category.power;
equalizer.size = 1;
equalizer.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getSignal: function(){
			return this._signal;
		},
		setSignal: function(val){
			this._signal = val;
		},
		asignal: function(){
			return false;
		}
	});
	entity.setSignal(0);
	return entity;
});
