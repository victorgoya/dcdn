class CreateContents < ActiveRecord::Migration[5.1]
  def change
    create_table :contents do |t|
      t.string :key
      t.string :sha1sum
      t.string :info_hash
      t.string :title

      t.timestamps
    end
  end
end
