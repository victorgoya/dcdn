class Api::ContentsController < ApiController
  expose :contents, -> { Content.all }
  expose :content

  def create
    if content.save
      render json: content
    else
      render json: { error: "error" }
    end
  end

  protected

  def content_params
    params.require(:content).permit(:key, :torrent, :title)
  end
end
