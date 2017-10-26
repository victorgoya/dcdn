class CreateContents < ActiveRecord::Migration[5.1]
  def change
    create_table :contents do |t|
      t.string :key
      t.string :info_hash
      t.string :title
      t.binary :torrent
      t.timestamps
    end
  end
end
