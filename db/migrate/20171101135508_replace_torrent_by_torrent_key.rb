class ReplaceTorrentByTorrentKey < ActiveRecord::Migration[5.1]
  def change
    remove_column :contents, :torrent
    add_column :contents, :torrent_key, :string
  end
end
