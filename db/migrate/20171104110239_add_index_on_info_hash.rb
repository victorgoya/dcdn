class AddIndexOnInfoHash < ActiveRecord::Migration[5.1]
  def change
    add_index :contents, :info_hash
  end
end
